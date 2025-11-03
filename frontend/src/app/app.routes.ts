import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  /*{
    path: '',
    loadComponent: () =>
      import('./user-list/user-list.component').then(m => m.UserListComponent)
  },*/
  {
  path: 'collision',
  loadComponent: () => import('./availability-check/availability-check.component').then(m => m.AvailabilityCheckComponent),
  canActivate: [AuthGuard]
  },
  {
    path: 'reserva-usuario',
    loadComponent: () => import('./reserva-usuario/reserva-usuario.component').then(m => m.ReservaUsuarioComponent),
    canActivate: [AuthGuard] // si estás usando protección con Auth0
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home-page/home-page.component').then(m => m.HomePageComponent)
  }
];
