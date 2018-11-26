import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Turista } from '../shared/models/turista';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TuristaService {

  constructor(private http: HttpClient ) { }

  getTurista(ci: number): Observable<Turista> {

    return this.http.get<Turista>('http://turismo.getsandbox.com/getTurista/' + ci);
  }

}
