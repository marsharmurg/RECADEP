import { Field } from "./field.model";
import { Customer } from "./customer.model";
import { Rent } from "./rent.model";

export interface Reservation {
  reservationId: bigint;
  reservationDate: string;
  startTime: string;
  endTime: string;
  status: boolean;
  field: Field;
  customer: Customer;
  rents: Rent;
}
