import { Sala } from "./sala.model";
import { UsuarioResponse } from "./usuario.model";

export type ReservaEstado = 'ACTIVA' | 'CANCELADA' | 'FINALIZADA';

//TODO: incluir sala y usuario si es necesario

export interface Reserva {
  idReserva: number;
  nombreSala: string;
  username: string;
  fechaInicio: string | Date;
  fechaFin: string | Date;
  estado: ReservaEstado;
}

export interface CrearReservaRequest {
  idSala: number;
  idUsuario: number;
  fechaInicio: string;
  fechaFin: string;
}

export interface CancelarReservaRequest {
  idReserva: number;
  motivo: string;
}