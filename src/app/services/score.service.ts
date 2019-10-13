import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
// import { Schedule } from './../models/schedual.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  public API = environment.urlApi;

  constructor(public http: HttpClient) { }

  getAllScore(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/api/subscore/`, httpOptions);
  }

}
