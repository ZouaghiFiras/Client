import {createReducer, on} from '@ngrx/store';
import {AdditionalDocumentsPageActions} from 'src/app/_modules/enter/app/additional-documents/actions';
import {AdditionalDocumentsGroup} from '../models/additional-documents.model';
import {AdditionalDocuments} from '../interfaces/additional-documents.interface';

export interface State {
  data: AdditionalDocuments;
  isValid: boolean;
}

const initialState = new AdditionalDocumentsGroup();

const additionalDocumentsReducer = createReducer(
  initialState,
  on(
    AdditionalDocumentsPageActions.patch,
    (state: State, action: ReturnType<typeof AdditionalDocumentsPageActions.patch>) => ({
      ...state,
      data: { ...state.data, ...action.payload }
    })
  ),
  on(
    AdditionalDocumentsPageActions.changeValidationStatus,
    (
      state: State,
      { isValid }: ReturnType<typeof AdditionalDocumentsPageActions.changeValidationStatus>
    ) => ({
      ...state,
      isValid
    })
  )
);

export function reducer(state: State, action: AdditionalDocumentsPageActions.Union) {
  return additionalDocumentsReducer(state, action);
}

export const selectAdditionalDocumentsGroupData = (state: State) => state.data;
export const selectAdditionalDocumentsGroupIsValid = (state: State) => state.isValid;
