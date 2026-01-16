export interface Sala {
    id: number;
    nombre: string;
    capacidad: number;
    descripcion?: string;
    estado: 'DISPONIBLE' | 'MANTENIMIENTO' | 'OCUPADA';
}