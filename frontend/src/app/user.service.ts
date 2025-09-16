import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.apiUrl = isPlatformServer(this.platformId)
      ? 'http://spring-backend:8080/api/users'
      : 'http://localhost:8080/api/users';
      console.log('Is platform server?', isPlatformServer(this.platformId));
      console.log('Resolved API URL:', this.apiUrl);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
