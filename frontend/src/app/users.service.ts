import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformServer  } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Users } from "./models/users.model";

@Injectable({
  providedIn: "root"
})

export class UsersService {

  private apiUrl: string;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.apiUrl = isPlatformServer(this.platformId)
    ? 'http://spring-backend:8080/api/users'
    : 'http://localhost:8080/api/users';
  }

  getAll(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrl);
  }

  getById(id: number): Observable<Users> {
    return this.http.get<Users>(`${this.apiUrl}/${id}`);
  }

  create(users: Users): Observable<Users> {
    return this.http.post<Users>(this.apiUrl, users);
  }

  update(id: number, users: Users): Observable<Users> {
    return this.http.put<Users>(`${this.apiUrl}/${id}`, users);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
