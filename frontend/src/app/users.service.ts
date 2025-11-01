import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformServer  } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Users } from "./models/users.model";
<<<<<<< HEAD

=======
import { environment } from "./enviroment";
>>>>>>> 7cd2d7e (FEAT: Desarrollo de componentes UI para validación de colisiones)
@Injectable({
  providedIn: "root"
})

export class UsersService {

  private apiUrl: string;

<<<<<<< HEAD
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.apiUrl = isPlatformServer(this.platformId)
    ? 'http://spring-backend:8080/api/users'
    : 'http://localhost:8080/api/users';
  }
=======
  /*constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.apiUrl = isPlatformServer(this.platformId)
    ? 'http://spring-backend:8080/api/users'
    : 'http://localhost:8080/api/users';
  }*/
  constructor(
      private http: HttpClient,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {
      if (isPlatformServer(this.platformId)) {
        // Angular ejecutándose en SSR (Node.js)
        this.apiUrl = environment.springDocker + '/user';
      } else {
        // Angular ejecutándose en navegador
        // Detectar si está en Docker usando hostname o heurística
        const isDocker = window.location.hostname !== 'localhost';

        this.apiUrl = isDocker
          ? environment.springHostBridge + '/user'
          : environment.springLocal + '/user';
      }
    }
>>>>>>> 7cd2d7e (FEAT: Desarrollo de componentes UI para validación de colisiones)

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
<<<<<<< HEAD
=======

  // Nuevo método para sincronizar usuario con el backend por Auth0 con correo
  sincronizarUsuario(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/sync`, {});
  }
>>>>>>> 7cd2d7e (FEAT: Desarrollo de componentes UI para validación de colisiones)
}
