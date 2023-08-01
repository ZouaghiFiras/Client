import {createReducer, on} from '@ngrx/store';
import {DamageReasonGroup} from '../models/damage-reason.model';
import {DamageReasonPageActions} from '../../damage-reason/actions';
import {DamageReason} from '../interfaces/damage-reason.interface';

export interface State {
  data: DamageReason;
  isValid: boolean;
}

const initialState = new DamageReasonGroup();

const damageReasonReducer = createReducer(
  initialState,
  on(
    DamageReasonPageActions.patch,
    (state: State, action: ReturnType<typeof DamageReasonPageActions.patch>) => ({
      ...state,
      data: { ...state.data, ...action.payload }
    })
  ),
  on(
    DamageReasonPageActions.changeValidationStatus,
    (
      state: State,
      { isValid }: ReturnType<typeof DamageReasonPageActions.changeValidationStatus>
    ) => ({
      ...state,
      isValid
    })
  )
);

export function reducer(state: State, action: DamageReasonPageActions.Union) {
  return damageReasonReducer(state, action);
}

export const selectDamageReasonGroupData = (state: State) => state.data;
export const selectDamageReasonGroupIsValid = (state: State) => state.isValid;
