import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: any;

  constructor(private http: HttpClient) {}

  login(username: string) {
    const headers = {
      Authorization: 'Basic ' + btoa(username.toLowerCase() + ':'),
    };
    //return this.http.get('http://192.168.178.48:8080/api/login', { headers });
    return this.http.get('http://localhost:8080/api/login', { headers });
  }

  setUserName(username: string) {
    localStorage.setItem('cs2-manager-username', username.toLowerCase());
  }

  getUserName() {
    return localStorage.getItem('cs2-manager-username');
  }
}
