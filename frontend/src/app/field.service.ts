
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformServer  } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Field } from "./models/field.model";

@Injectable({
  providedIn: "root"
})

export class FieldService {

  private apiUrl: string;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.apiUrl = isPlatformServer(this.platformId)
    ? 'http://spring-backend:8080/api/field'
    : 'http://localhost:8080/api/field';
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

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
