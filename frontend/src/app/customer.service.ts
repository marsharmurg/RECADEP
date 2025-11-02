import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformServer  } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Customer } from "./models/customer.model";
<<<<<<< HEAD

=======
import { environment } from "./enviroment";
>>>>>>> 7cd2d7e (FEAT: Desarrollo de componentes UI para validación de colisiones)
@Injectable({
  providedIn: "root"
})

export class CustomerService {

  private apiUrl: string;

<<<<<<< HEAD
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.apiUrl = isPlatformServer(this.platformId)
    ? 'http://spring-backend:8080/api/customer'
    : 'http://localhost:8080/api/customer';
  }
=======
  /*constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.apiUrl = isPlatformServer(this.platformId)
    ? 'http://spring-backend:8080/api/customer'
    : 'http://localhost:8080/api/customer';
  }*/
  constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
      ) {
        if (isPlatformServer(this.platformId)) {
          // Angular ejecutándose en SSR (Node.js)
          this.apiUrl = environment.springDocker + '/customer';
        } else {
          // Angular ejecutándose en navegador
          // Detectar si está en Docker usando hostname o heurística
          const isDocker = window.location.hostname !== 'localhost';

          this.apiUrl = isDocker
            ? environment.springHostBridge + '/customer'
            : environment.springLocal + '/customer';
        }
      }
>>>>>>> 7cd2d7e (FEAT: Desarrollo de componentes UI para validación de colisiones)

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  update(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${id}`, customer);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
