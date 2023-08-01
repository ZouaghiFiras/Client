import {createReducer, on} from '@ngrx/store';
import {PartyGroup} from '../models/party.model';
import {PartyPageActions} from '../../Party/actions';
import {Party} from '../interfaces/party.interface';

export interface State {
  data: Party;
  isValid: boolean;
}

const initialState = new PartyGroup();

const partyReducer = createReducer(
  initialState,
  on(
    PartyPageActions.patch,
    (state: State, action: ReturnType<typeof PartyPageActions.patch>) => ({
      ...state,
      data: { ...state.data, ...action.payload }
    })
  ),
  on(
    PartyPageActions.changeValidationStatus,
    (
      state: State,
      { isValid }: ReturnType<typeof PartyPageActions.changeValidationStatus>
    ) => ({
      ...state,
      isValid
    })
  )
);

export function reducer(state: State, action: PartyPageActions.Union) {
  return partyReducer(state, action);
}

export const selectPartyGroupData = (state: State) => state.data;
export const selectPartyGroupIsValid = (state: State) => state.isValid;
