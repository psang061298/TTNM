import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Transcript } from './../models/transcript.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class TranscriptService {

  public API = environment.urlApi;
  constructor(
    public http: HttpClient
  ) { }

  getAllTranScript(): Observable<Transcript[]> {
    return this.http.get<Transcript[]>(`${this.API}/api/transcript/`, httpOptions);
  }
}
