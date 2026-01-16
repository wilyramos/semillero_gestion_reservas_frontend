export interface Reserva {
    id: number;
    fechaInicio: Date;
    fechaFin: Date;
    salaId: number;
    usuarioId: number;
    estado: 'ACTIVA' | 'CANCELADA' | 'FINALIZADA';
}