import {createReducer, on} from '@ngrx/store';
import {AdditionalQuestionsPageActions} from 'src/app/_modules/enter/app/additional-questions/actions';
import {AdditionalQuestionsGroup} from '../models/additional-questions.model';
import {AdditionalQuestions} from '../interfaces/additional-questions.interface';

export interface State {
  data: AdditionalQuestions;
  isValid: boolean;
}

const initialState = new AdditionalQuestionsGroup();

const additionalQuestionsReducer = createReducer(
  initialState,
  on(
    AdditionalQuestionsPageActions.patch,
    (state: State, action: ReturnType<typeof AdditionalQuestionsPageActions.patch>) => ({
      ...state,
      data: { ...state.data, ...action.payload }
    })
  ),
  on(
    AdditionalQuestionsPageActions.changeValidationStatus,
    (
      state: State,
      { isValid }: ReturnType<typeof AdditionalQuestionsPageActions.changeValidationStatus>
    ) => ({
      ...state,
      isValid
    })
  )
);

export function reducer(state: State, action: AdditionalQuestionsPageActions.Union) {
  return additionalQuestionsReducer(state, action);
}

export const selectAdditionalQuestionsGroupData = (state: State) => state.data;
export const selectAdditionalQuestionsGroupIsValid = (state: State) => state.isValid;
