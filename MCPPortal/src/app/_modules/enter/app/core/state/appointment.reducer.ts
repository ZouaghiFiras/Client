import {createReducer, on} from '@ngrx/store';
import {Appointment} from '../interfaces/appointment.interface';
import {AppointmentGroup} from '../models/appointment.model';
import {AppointmentPageActions} from '../../Appointment/actions';

export interface State {
  data: Appointment;
  isValid: boolean;
}

const initialState = new AppointmentGroup();

const appointmentReducer = createReducer(
  initialState,
  on(
    AppointmentPageActions.patch,
    (state: State, action: ReturnType<typeof AppointmentPageActions.patch>) => ({
      ...state,
      data: { ...state.data, ...action.payload }
    })
  ),
  on(
    AppointmentPageActions.changeValidationStatus,
    (
      state: State,
      {
        isValid
      }: ReturnType<typeof AppointmentPageActions.changeValidationStatus>
    ) => ({
      ...state,
      isValid
    })
  )
);

export function reducer(state: State, action: AppointmentPageActions.Union) {
  return appointmentReducer(state, action);
}

export const selectAppointmentGroupData = (state: State) => state.data;
export const selectAppointmentGroupIsValid = (state: State) => state.isValid;
