import {createReducer, on} from '@ngrx/store';
import {PartiesGroup} from '../models/parties.model';
import {PartiesPageActions} from '../../Parties/actions';
import {Party} from '../interfaces/parties.interface';

export interface State {
  data: Party[];
  isValid: boolean;
}

const initialState: PartiesGroup = {
  data: [],
  isValid: false,
};

const partiesReducer = createReducer(
  initialState,
    // on(
    //   PartiesPageActions.addParty,
    //   (state: State, action: ReturnType<typeof PartiesPageActions.addParty>) => ({
    //     ...state,
    //     data: { ...state.data,   ...action.party }
    //   })
    // ),
  on(
    PartiesPageActions.patch,
    (state: State, action: ReturnType<typeof PartiesPageActions.patch>) => ({
      ...state,
      data: { ...state.data, ...action.payload }
    })
  ),
  on(
    PartiesPageActions.changeValidationStatus,
    (state: State, { isValid }: ReturnType<typeof PartiesPageActions.changeValidationStatus>) => ({
      ...state,
      isValid
    })
  )
);

export function reducer(state: State, action: PartiesPageActions.Union) {
  return partiesReducer(state, action);
}

export const selectPartiesGroupData = (state: State) => state.data;
export const selectPartiesGroupIsValid = (state: State) => state.isValid;
