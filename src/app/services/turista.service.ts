import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Turista } from '../shared/models/turista';
import { Observable, of } from 'rxjs';
import { stringify } from 'querystring';
import { Categoria } from '../shared/models/categoria';


@Injectable({
  providedIn: 'root'
})
export class TuristaService {
  url: string;

  constructor(private http: HttpClient) {}

  getTurista(ci: number): Observable<Turista> {
    this.url = 'http://turismo.getsandbox.com/getTurista/'.concat(String(ci));

    console.log(this.url);
    return this.http.get<Turista>(this.url);
  }
  postTurista(nuevoTurista) {
    this.http
      .post('http://turismo.getsandbox.com/turista', nuevoTurista)
      .subscribe(
        data => {
          console.log('okk', data);
          return data;
        },
        error => {
          console.log('error', error);
        }
      );
  }
}
