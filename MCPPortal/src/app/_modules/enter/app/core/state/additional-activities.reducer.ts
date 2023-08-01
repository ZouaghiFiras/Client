import {createReducer, on} from '@ngrx/store';
import {AdditionalActivitiesPageActions} from 'src/app/_modules/enter/app/additional-activities/actions';
import {AdditionalActivitiesGroup} from '../models/additional-activities.model';
import {AdditionalActivities} from '../interfaces/additional-activities.interface';

export interface State {
  data: AdditionalActivities;
  isValid: boolean;
}

const initialState = new AdditionalActivitiesGroup();

const additionalActivitiesReducer = createReducer(
  initialState,
  on(
    AdditionalActivitiesPageActions.patch,
    (state: State, action: ReturnType<typeof AdditionalActivitiesPageActions.patch>) => ({
      ...state,
      data: { ...state.data, ...action.payload }
    })
  ),
  on(
    AdditionalActivitiesPageActions.changeValidationStatus,
    (
      state: State,
      { isValid }: ReturnType<typeof AdditionalActivitiesPageActions.changeValidationStatus>
    ) => ({
      ...state,
      isValid
    })
  )
);

export function reducer(state: State, action: AdditionalActivitiesPageActions.Union) {
  return additionalActivitiesReducer(state, action);
}

export const selectAdditionalActivitiesGroupData = (state: State) => state.data;
export const selectAdditionalActivitiesGroupIsValid = (state: State) => state.isValid;
