
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformServer  } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Rent } from "./models/rent.model";
<<<<<<< HEAD

=======
import { environment } from "./enviroment";
>>>>>>> 7cd2d7e (FEAT: Desarrollo de componentes UI para validación de colisiones)
@Injectable({
  providedIn: "root"
})

export class ReservationService {

  private apiUrl: string;

<<<<<<< HEAD
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.apiUrl = isPlatformServer(this.platformId)
    ? 'http://spring-backend:8080/api/field'
    : 'http://localhost:8080/api/field';
  }
=======
  /*constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.apiUrl = isPlatformServer(this.platformId)
    ? 'http://spring-backend:8080/api/field'
    : 'http://localhost:8080/api/field';
  }*/
  constructor(
      private http: HttpClient,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {
      if (isPlatformServer(this.platformId)) {
        // Angular ejecutándose en SSR (Node.js)
        this.apiUrl = environment.springDocker + '/rent';
      } else {
        // Angular ejecutándose en navegador
        // Detectar si está en Docker usando hostname o heurística
        const isDocker = window.location.hostname !== 'localhost';

        this.apiUrl = isDocker
          ? environment.springHostBridge + '/rent'
          : environment.springLocal + '/rent';
      }
    }
>>>>>>> 7cd2d7e (FEAT: Desarrollo de componentes UI para validación de colisiones)

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

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
