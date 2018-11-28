import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paquete } from '../shared/models/paquete';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {
  constructor(private http: HttpClient) {}

  getPaquete(nombre: string): Observable<Paquete> {
    return this.http.get<Paquete>(
      'http://turismo.getsandbox.com/paquetes/'.concat(nombre)
    );
  }
  getPaquetesTodos(id: number): Observable<Paquete[]> {
    return this.http.get<Paquete[]>('http://localhost:8080/paquete/getPaquetes/?id_categoria='.concat(String(id)));
  }
  getPaquetes(): Observable<Paquete[]> {
    // return this.http.get<Paquete[]>('http://turismo.getsandbox.com/paquetes');
    return this.http.get<Paquete[]>('http://localhost:8080/paquete/get');
  }
}
