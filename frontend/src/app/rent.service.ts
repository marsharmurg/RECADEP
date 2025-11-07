import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rent } from './models/rent.model';
import { environment } from './enviroment';
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl: string;

  /*constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.apiUrl = isPlatformServer(this.platformId)
    ? 'http://spring-backend:8080/api/field'
    : 'http://localhost:8080/api/field';
  }*/
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    let baseUrl: string;

    // 1. Lado del Servidor (SSR/Node.js)
    if (isPlatformServer(this.platformId)) {
      baseUrl = environment.springDocker;

      // 2. Lado del Cliente (Navegador)
      // ESTO AHORA FUNCIONA porque isPlatformBrowser está importado
    } else if (isPlatformBrowser(this.platformId)) {
      const isDocker = window.location.hostname !== 'localhost';

      baseUrl = isDocker
        ? environment.springHostBridge
        : environment.springLocal;
    } else {
      baseUrl = environment.springLocal;
    }

    this.apiUrl = baseUrl + '/rent';
  }

  getAll(): Observable<Rent[]> {
    return this.http.get<Rent[]>(this.apiUrl);
  }

  getById(id: number): Observable<Rent> {
    return this.http.get<Rent>(`${this.apiUrl}/${id}`);
  }

  create(rent: Rent): Observable<Rent> {
    return this.http.post<Rent>(this.apiUrl, rent);
  }

  update(id: number, rent: Rent): Observable<Rent> {
    return this.http.put<Rent>(`${this.apiUrl}/${id}`, rent);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
