import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpHeaders } from '@angular/common/http';
import { Subject } from '../models/subjects.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public API = environment.urlApi;
  constructor(
    public http: HttpClient
  ) { }

  // getAllUsers(): Observable<Subject[]> {
  //   return this.http.get<Subject[]>(`${this.API}/api/subject/`);
  // }

  getCurrentUsername(): Observable<User> {
    return this.http.get<User>(`${this.API}/api/user/`, httpOptions);
  }

  getAllUser(page:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/api/user/?page=`+page, httpOptions);
  }

  deleteUser(id : number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.API}/api/user/`+id+`/`, httpOptions);
  }

  addUser(username: string, password: string, email: string, position: string): Observable<any[]> {

    const json = JSON.stringify({
      username: username,
      password: password,
      email: email,
      position: position
    });

    return this.http.post<any[]>(`${this.API}/api/user/register/`, json, httpOptions);
  }
}
