import {createAction, props} from '@ngrx/store';
import {Appointment} from '../../core/interfaces/appointment.interface';

export const patch = createAction(
  '[Appointment Page] Patch Value',
  props<{ payload: Partial<Appointment> }>()
);

export const changeValidationStatus = createAction(
  '[Appointment Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type Union = ReturnType<typeof patch | typeof changeValidationStatus>;
