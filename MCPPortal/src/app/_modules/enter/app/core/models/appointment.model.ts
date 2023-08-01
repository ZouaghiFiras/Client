import {Appointment} from '../interfaces/appointment.interface';

export class AppointmentGroup {
  data = {
    appointmentType: '',
    contactPerson: '',
  } as Appointment;
  isValid = false;
}
