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
    path: 'home',
    loadComponent: () =>
      import('./home-page/home-page.component').then(m => m.HomePageComponent)
  }
];
