import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AuthService, private usersService: UsersService /* import para validar usuarios por correo de Auth0 */) {}
  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      console.log('Usurio: ', user?.email);
      console.log('Nombre: ', user?.name);
      console.log('Sub (ID Auth0): ', user?.sub);
    });

    // Sincronizar usuario con el backend al iniciar la aplicación
    this.usersService.sincronizarUsuario().subscribe({
      next: () => console.log('Usuario sincronizado correctamente'),
      error: err => console.error('Error al sincronizar usuario:', err)
    });
  }
}


