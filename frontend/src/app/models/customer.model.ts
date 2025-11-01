import {Users} from './users.model';
import { Reservation } from './reservation.model';
import { Rent } from './rent.model';

export interface Customer {
  customerId: bigint;
  registrationDate: string;
  users: Users;
  reservations: Reservation[];
  rents: Rent[];
}
