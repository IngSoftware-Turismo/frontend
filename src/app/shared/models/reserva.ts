import { Turista } from './turista';
import { Paquete } from './paquete';

export class Reserva {
  id: number;
  fecha: string;
  metodoPago: string;
  estadoPago: string;
  eliminado: boolean;
  turista: Turista;
  paquete: Paquete;
}
