import { Component, OnInit } from '@angular/core';
import { AdminService, DashboardStats } from '@modules/admin/services/admin.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stats?: DashboardStats;
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  public lineChartType: 'line' = 'line';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.adminService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.processCharts(data);
      },
      error: (err) => console.error('Error cargando stats:', err)
    });
  }

  processCharts(data: DashboardStats): void {

    if (!data.horasPico) {
      return;
    }

    // Ordenar horas numéricamente
    const sortedHours = Object.keys(data.horasPico)
      .map(h => Number(h))
      .sort((a, b) => a - b);

    const values = sortedHours.map(h => data.horasPico[h.toString()]);

    this.lineChartData = {
      labels: sortedHours.map(h => `${h}:00`),
      datasets: [
        {
          label: 'Reservas por hora',
          data: values,
          borderColor: '#4facfe',
          backgroundColor: 'rgba(79, 172, 254, 0.2)',
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7
        }
      ]
    };
  }
}
