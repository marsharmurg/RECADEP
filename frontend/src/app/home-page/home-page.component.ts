import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationService } from '../reservation.service';
import { FieldService } from '../field.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  fieldType = '';
  fieldList: any[] = [];
  selectedFieldId = '';
  fecha = '';
  horaInicio = '';
  horaFin = '';
  horaFinDisabled = true;
  disponibilidad: boolean | null = null;

  constructor(
    private fieldService: FieldService,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  onFieldTypeChange() {
    this.selectedFieldId = '';
    this.fieldList = [];
    this.fecha = '';
    this.horaInicio = '';
    this.horaFin = '';
    this.horaFinDisabled = true;
    this.disponibilidad = null;

    if (this.fieldType) {
      this.fieldService.getFieldsByType(this.fieldType).subscribe(fields => {
        this.fieldList = fields;
      });
    }
  }

  onHoraInicioChange() {
    this.horaFinDisabled = false;
    this.horaFin = '';
  }

  validarHoras(): boolean {
    if (!this.horaInicio || !this.horaFin) return false;

    const inicio = this.parseHora(this.horaInicio);
    const fin = this.parseHora(this.horaFin);
    const duracion = (fin.getTime() - inicio.getTime()) / (1000 * 60); // minutos

    return (
      fin >= inicio &&
      duracion >= 30 &&
      duracion <= 120 &&
      fin <= this.parseHora('21:30')
    );
  }

  parseHora(horaStr: string): Date {
    const [h, m] = horaStr.split(':').map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  }

  consultarDisponibilidad() {
    if (!this.selectedFieldId || !this.fecha || !this.horaInicio || !this.horaFin || !this.validarHoras()) {
      this.disponibilidad = null;
      return;
    }

    this.reservationService.checkCollision(
      Number(this.selectedFieldId),
      this.fecha,
      this.horaInicio,
      this.horaFin
    ).subscribe((hayColision: boolean) => {
      this.disponibilidad = !hayColision;
    });
  }
}
