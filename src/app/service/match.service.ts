import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getCurrentMatch() {
    const headers = {
      Authorization: 'Basic ' + btoa(this.auth.getUserName() + ':'),
    };
    return this.http.get('http://localhost:8087/api/match/current', {
      headers,
    });
  }

  toggleReadyState() {
    const headers = {
      Authorization: 'Basic ' + btoa(this.auth.getUserName() + ':'),
    };
    return this.http.put(
      'http://localhost:8087/api/match/toggleReady',
      {},
      {
        headers,
      }
    );
  }
}
