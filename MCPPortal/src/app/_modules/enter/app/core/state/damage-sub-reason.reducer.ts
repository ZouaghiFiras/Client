import {createReducer, on} from '@ngrx/store';
import {DamageSubReasonGroup} from '../models/damage-sub-reason.model';
import {DamageSubReasonPageActions} from '../../damage-sub-reason/actions';
import {DamageSubReason} from '../interfaces/damage-sub-reason.interface';

export interface State {
  data: DamageSubReason;
  isValid: boolean;
}

const initialState = new DamageSubReasonGroup();

const damageSubReasonReducer = createReducer(
  initialState,
  on(
    DamageSubReasonPageActions.patch,
    (state: State, action: ReturnType<typeof DamageSubReasonPageActions.patch>) => ({
      ...state,
      data: { ...state.data, ...action.payload }
    })
  ),
  on(
    DamageSubReasonPageActions.changeValidationStatus,
    (
      state: State,
      { isValid }: ReturnType<typeof DamageSubReasonPageActions.changeValidationStatus>
    ) => ({
      ...state,
      isValid
    })
  )
);

export function reducer(state: State, action: DamageSubReasonPageActions.Union) {
  return damageSubReasonReducer(state, action);
}

export const selectDamageSubReasonGroupData = (state: State) => state.data;
export const selectDamageSubReasonGroupIsValid = (state: State) => state.isValid;
