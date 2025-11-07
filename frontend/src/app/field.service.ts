import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Field } from './models/field.model';
import { environment } from './enviroment';
@Injectable({
  providedIn: 'root',
})
export class FieldService {
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

    this.apiUrl = baseUrl + '/field';
  }

  getAll(): Observable<Field[]> {
    return this.http.get<Field[]>(this.apiUrl);
  }

  getById(id: number): Observable<Field> {
    return this.http.get<Field>(`${this.apiUrl}/${id}`);
  }

  create(field: Field): Observable<Field> {
    return this.http.post<Field>(this.apiUrl, field);
  }

  update(id: number, field: Field): Observable<Field> {
    return this.http.put<Field>(`${this.apiUrl}/${id}`, field);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getFieldsByType(fieldType: string): Observable<Field[]> {
    return this.http.get<Field[]>(`${this.apiUrl}/by-type?type=${fieldType}`);
  }
}
