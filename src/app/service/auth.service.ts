import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  currentUser: any;

  constructor(private http: HttpClient) {}

  login(username: string) {
    const headers = {
      Authorization: 'Basic ' + btoa(username.toLowerCase() + ':'),
    };
    return this.http.get(`${this.apiUrl}/api/login`, { headers });
  }

  setUserName(username: string) {
    localStorage.setItem('cs2-manager-username', username.toLowerCase());
  }

  getUserName() {
    return localStorage.getItem('cs2-manager-username');
  }
}
