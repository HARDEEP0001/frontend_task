// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  getRepositories(username: string) {
    return this.http.get(`${this.apiUrl}/users/${username}/repos`);
  }
}
