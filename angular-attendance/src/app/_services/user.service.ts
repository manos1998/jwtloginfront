import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getUserLoggedIn(id: any): Observable<any> {
    return this.http.post(`${API_URL + 'user'}/${id}/loggin`, {responseType: 'text'})
  }

  getUserLoggedOut(id: any): Observable<any> {
    return this.http.post(`${API_URL + 'user'}/${id}/logout`, {responseType: 'text'})
  }

  getUserViewReport(id: any): Observable<any> {
    return this.http.get(`${API_URL + 'user/report'}/${id}`);
  }

  getAdminViewReport(id: any, date: any): Observable<any> {
    return this.http.get(`${API_URL + 'user/report'}/${id}?date=${date}`);
  }

  findByTitle(title: any): Observable<any> {
    return this.http.get<any>(`${API_URL + 'user'}?title=${title}`);
  }
  
  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin');
  }

}