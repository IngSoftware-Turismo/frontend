import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import {Categoria} from '../shared/models/categoria';
import {Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

constructor(private http: HttpClient ) { }

getCategorias(): Observable <Categoria[]> {
  // return of (CATEGORIAS);
  return this.http.get<Categoria[]>('http://turismo.getsandbox.com/categorias');
}
}
