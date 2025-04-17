import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getData() {
    const headers = {
      Authorization: 'Basic ' + btoa(this.auth.getUserName() + ':'),
    };
    return this.http.get('http://localhost:8080/api/match/data', {
      headers,
    });
  }

  toggleReadyState() {
    const headers = {
      Authorization: 'Basic ' + btoa(this.auth.getUserName() + ':'),
    };
    return this.http.put(
      'http://localhost:8080/api/match/toggleReady',
      {},
      {
        headers,
      }
    );
  }

  voteMap(map: string) {
    const headers = {
      Authorization: 'Basic ' + btoa(this.auth.getUserName() + ':'),
    };
    return this.http.put(
      'http://localhost:8080/api/match/voteMap/' + map,
      {},
      {
        headers,
      }
    );
  }

  getSteamUrl() {
    const headers = {
      Authorization: 'Basic ' + btoa(this.auth.getUserName() + ':'),
    };
    return this.http.get('http://localhost:8080/api/match/steamUrl', {
      headers: headers,
      responseType: 'text',
    });
  }
}
