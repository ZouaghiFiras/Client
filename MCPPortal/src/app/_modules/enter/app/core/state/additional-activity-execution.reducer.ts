import {createReducer, on} from '@ngrx/store';
import {AdditionalActivityExecutionPageActions} from 'src/app/_modules/enter/app/additional-activity-execution/actions';
import {AdditionalActivityExecutionGroup} from '../models/additional-activity-execution.model';
import {AdditionalActivityExecution} from '../interfaces//additional-activity-execution.interface';

export interface State {
  data: AdditionalActivityExecution;
  isValid: boolean;
}

const initialState = new AdditionalActivityExecutionGroup();

const additionalActivityExecutionReducer = createReducer(
  initialState,
  on(
    AdditionalActivityExecutionPageActions.patch,
    (state: State, action: ReturnType<typeof AdditionalActivityExecutionPageActions.patch>) => ({
      ...state,
      data: { ...state.data, ...action.payload }
    })
  ),
  on(
    AdditionalActivityExecutionPageActions.changeValidationStatus,
    (
      state: State,
      { isValid }: ReturnType<typeof AdditionalActivityExecutionPageActions.changeValidationStatus>
    ) => ({
      ...state,
      isValid
    })
  )
);

export function reducer(state: State, action: AdditionalActivityExecutionPageActions.Union) {
  return additionalActivityExecutionReducer(state, action);
}

export const selectAdditionalActivityExecutionGroupData = (state: State) => state.data;
export const selectAdditionalActivityExecutionGroupIsValid = (state: State) => state.isValid;
