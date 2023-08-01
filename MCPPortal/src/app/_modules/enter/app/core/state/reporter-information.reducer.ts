import {createReducer, on} from '@ngrx/store';
import {ReporterInformation} from '../interfaces/reporter-information.interface';
import {ReporterInformationGroup} from '../models/reporter-information.model';
import {ReporterInformationPageActions} from '../../reporter-information/actions';

export interface State {
  data: ReporterInformation;
  isValid: boolean;
}

const initialState = new ReporterInformationGroup();

const reporterInformationReducer = createReducer(
  initialState,
  on(
    ReporterInformationPageActions.patch,
    (state: State, action: ReturnType<typeof ReporterInformationPageActions.patch>) => ({
      ...state,
      data: { ...state.data, ...action.payload }
    })
  ),
  on(
    ReporterInformationPageActions.changeValidationStatus,
    (
      state: State,
      { isValid }: ReturnType<typeof ReporterInformationPageActions.changeValidationStatus>
    ) => ({
      ...state,
      isValid
    })
  )
);

export function reducer(state: State, action: ReporterInformationPageActions.Union) {
  return reporterInformationReducer(state, action);
}

export const selectReporterInformationGroupData = (state: State) => state.data;
export const selectReporterInformationGroupIsValid = (state: State) => state.isValid;
