import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Subject } from '../models/subjects.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // 'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    'Set-Cookie' : 'HttpOnly;Secure;SameSite=Strict'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  public API = environment.urlApi;
  constructor(
    public http: HttpClient
  ) { }

  getAllSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.API}/api/subject/`);
  }

  getOneSubject(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.API}/api/subject/${id}`);
  }

  getSubjectOfCourse(id : number) : Observable<Subject[]>{
      return this.http.get<Subject[]>(`${this.API}/api/subject/?program_id=${id}`,httpOptions);
  }

}
