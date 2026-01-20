import { Sala } from "./sala.model";
import { UsuarioResponse } from "./usuario.model";

export type ReservaEstado = 'ACTIVA' | 'CANCELADA' | 'FINALIZADA';

export interface Reserva {
  idReserva: number;
  idSala: number;
  idUsuario: number;
  fechaInicio: string | Date;
  fechaFin: string | Date;
  estado: ReservaEstado;

  // REVISAR: Relaciones opcionales
  sala?: Sala;
  usuario?: UsuarioResponse;
}

export interface CrearReservaRequest {
  idSala: number;
  idUsuario: number;
  fechaInicio: string | Date;
  fechaFin: string | Date;
}

export interface CancelarReservaRequest {
  idReserva: number;
  motivo: string;
}
