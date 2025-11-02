import {Customer} from './customer.model';
import { Employeer } from './employee.model';

export interface Users {
  usersId: bigint;
  username: string;
  lastname: string;
  bithdate: string;
  documentNumber: number;
  employee: Employeer;
  customer: Customer;
}
