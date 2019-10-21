import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  })
};

const httpOptions_Formdata = {
  headers: new HttpHeaders({
    'Content-Type':  'multipart/form-data', //application/x-www-form-urlencoded
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public API = environment.urlApi;

  constructor(public http: HttpClient) { }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.API}/api/user/profile/`, httpOptions);
  }

  updateProfile_Json(uid, obj): Observable<any> {
    const jsonData = JSON.stringify(obj);
    return this.http.patch<any>(`${this.API}/api/user/${uid}/`, jsonData, httpOptions);
  }

  updateProfile_FormData(uid, obj: FormData): Observable<any> {
    // const jsonData = JSON.stringify(obj);
    return this.http.put<any>(`${this.API}/api/user/${uid}/`, obj, httpOptions_Formdata);
  }

  // updateAvatar(uid, file, file_name): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('image', file, file_name);
  //   return this.http.patch<any>(`${this.API}/api/user/${uid}/`, formData, httpOptions);
  // }
}
