import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paquete } from '../shared/models/paquete';

@Injectable({
  providedIn: "root"
})
export class PaqueteService {
  constructor(private http:HttpClient) {}

  getCategoria(nombre: string): Observable<Paquete> {
    return this.http.get<Paquete>(
      "http://turismo.getsandbox.com/getPaquete/".concat(nombre)
    );
  }
}
