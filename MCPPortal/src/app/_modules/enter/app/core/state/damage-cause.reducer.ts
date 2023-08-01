import {createReducer, on} from '@ngrx/store';
import {DamageCauseGroup} from '../models/damage-cause.model';
import {DamageCausePageActions} from '../../damage-cause/actions';
import {DamageCause} from '../interfaces/damage-cause.interface';

export interface State {
  data: DamageCause;
  isValid: boolean;
}

const initialState = new DamageCauseGroup();

const damageCauseReducer = createReducer(
  initialState,
  on(
    DamageCausePageActions.patch,
    (state: State, action: ReturnType<typeof DamageCausePageActions.patch>) => ({
      ...state,
      data: { ...state.data, ...action.payload }
    })
  ),
  on(
    DamageCausePageActions.changeValidationStatus,
    (
      state: State,
      { isValid }: ReturnType<typeof DamageCausePageActions.changeValidationStatus>
    ) => ({
      ...state,
      isValid
    })
  )
);

export function reducer(state: State, action: DamageCausePageActions.Union) {
  return damageCauseReducer(state, action);
}

export const selectDamageCauseGroupData = (state: State) => state.data;
export const selectDamageCauseGroupIsValid = (state: State) => state.isValid;
