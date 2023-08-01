import {createReducer, on} from '@ngrx/store';
import {AdditionalReportingFormPageActions} from 'src/app/_modules/enter/app/additional-reporting-form/actions';
import {AdditionalReportingFormGroup} from '../models/additional-reporting-form.model';
import {AdditionalReportingForm} from '../interfaces/additional-reporting-form.interface';

export interface State {
  data: AdditionalReportingForm;
  isValid: boolean;
}

const initialState = new AdditionalReportingFormGroup();

const additionalReportingFormReducer = createReducer(
  initialState,
  on(
    AdditionalReportingFormPageActions.patch,
    (state: State, action: ReturnType<typeof AdditionalReportingFormPageActions.patch>) => ({
      ...state,
      data: { ...state.data, ...action.payload }
    })
  ),
  on(
    AdditionalReportingFormPageActions.changeValidationStatus,
    (
      state: State,
      { isValid }: ReturnType<typeof AdditionalReportingFormPageActions.changeValidationStatus>
    ) => ({
      ...state,
      isValid
    })
  )
);

export function reducer(state: State, action: AdditionalReportingFormPageActions.Union) {
  return additionalReportingFormReducer(state, action);
}

export const selectAdditionalReportingFormGroupData = (state: State) => state.data;
export const selectAdditionalReportingFormGroupIsValid = (state: State) => state.isValid;
