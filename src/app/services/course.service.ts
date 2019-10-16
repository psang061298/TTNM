import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from './../models/course.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  public API = environment.urlApi;

  constructor(
    public http: HttpClient
  ) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.API}/api/course/`);
  }

  getOneCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.API}/api/course/${id}`);
  }

  getInfo(id) : Observable<any>{
    return this.http.get<any>(`${this.API}/api/user/${id}/`,httpOptions);
  }
}
