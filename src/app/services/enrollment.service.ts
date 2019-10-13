import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  public API = environment.urlApi;
  constructor(
    public http: HttpClient
  ) { }

  enroll(courseID: string): Observable<Enrollment> {
    console.log(courseID);
    
    return this.http.post<Enrollment>(`${this.API}/api/stup/create/`, courseID, httpOptions);
  }
}
