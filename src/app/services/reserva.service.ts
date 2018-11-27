import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../shared/models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  constructor(private http: HttpClient) { }

  reservar(reserva:Reserva) {
    return this.http.post('http://localhost:8080/reserva/post', reserva);
  }
  getReservas(id: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>('http://localhost:8080/reserva/getReservas/?id_paquete='.concat(String(id)));
  }
}
