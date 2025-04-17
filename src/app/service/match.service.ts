import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getData() {
    const headers = {
      Authorization: 'Basic ' + btoa(this.auth.getUserName() + ':'),
    };
    return this.http.get(`${this.apiUrl}/api/match/data`, {
      headers,
    });
  }

  toggleReadyState() {
    const headers = {
      Authorization: 'Basic ' + btoa(this.auth.getUserName() + ':'),
    };
    return this.http.put(
      `${this.apiUrl}/api/match/toggleReady`,
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
      `${this.apiUrl}/api/match/voteMap/${map}`,
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
    return this.http.get(`${this.apiUrl}/api/match/steamUrl`, {
      headers: headers,
      responseType: 'text',
    });
  }
}
