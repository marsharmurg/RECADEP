import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { MatDialog } from '@angular/material/dialog';
import { ReservaPreviewDialogComponent } from '../dialogs/reserva-preview-dialog/reserva-preview-dialog.component';
import { ReservaValidacionFormComponent } from '../shared/reserva-validacion-form/reserva-validacion-form.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ReservaValidacionFormComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  disponibilidad: boolean | null = null;
  datosReserva: {
    canchaId: number;
    reservationDate: string;
    startTime: string;
    endTime: string;
  } | null = null;

  constructor(
    private router: Router,
    private auth: AuthService,
    private dialog: MatDialog
  ) {}

  onDisponibilidad(disponible: boolean | null) {
    this.disponibilidad = disponible;
  }

  onDatosReserva(datos: {
    canchaId: number;
    reservationDate: string;
    startTime: string;
    endTime: string;
  }) {
    this.datosReserva = datos;
  }

  iniciarReserva(): void {
    if (!this.datosReserva) return;

    const { canchaId, reservationDate, startTime, endTime } = this.datosReserva;

    this.auth.isAuthenticated$.subscribe((isAuth) => {
      if (!isAuth) {
        this.auth.loginWithRedirect({
          appState: {
            target: '/reserva-usuario',
            canchaId,
            fechaInicio: `${reservationDate}T${startTime}`,
            fechaFin: `${reservationDate}T${endTime}`,
          },
        });
      } else {
        const dialogRef = this.dialog.open(ReservaPreviewDialogComponent, {
          data: {
            canchaId,
            fechaInicio: `${reservationDate}T${startTime}`,
            fechaFin: `${reservationDate}T${endTime}`,
          },
        });

        dialogRef.afterClosed().subscribe((confirmado) => {
          if (confirmado) {
            this.router.navigate(['/reserva-usuario'], {
              queryParams: {
                canchaId,
                fechaInicio: `${reservationDate}T${startTime}`,
                fechaFin: `${reservationDate}T${endTime}`,
              },
            });
          }
        });
      }
    });
  }
}
