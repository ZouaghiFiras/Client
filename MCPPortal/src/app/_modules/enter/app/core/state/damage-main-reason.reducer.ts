import {createReducer, on} from '@ngrx/store';
import {DamageMainReasonGroup} from '../models/damage-main-reason.model';
import {DamageMainReasonPageActions} from '../../damage-main-reason/actions';
import {DamageMainReason} from '../interfaces/damage-main-reason.interface';

export interface State {
  data: DamageMainReason;
  isValid: boolean;
}

const initialState = new DamageMainReasonGroup();

const damageMainReasonReducer = createReducer(
  initialState,
  on(
    DamageMainReasonPageActions.patch,
    (state: State, action: ReturnType<typeof DamageMainReasonPageActions.patch>) => ({
      ...state,
      data: { ...state.data, ...action.payload }
    })
  ),
  on(
    DamageMainReasonPageActions.changeValidationStatus,
    (
      state: State,
      { isValid }: ReturnType<typeof DamageMainReasonPageActions.changeValidationStatus>
    ) => ({
      ...state,
      isValid
    })
  )
);

export function reducer(state: State, action: DamageMainReasonPageActions.Union) {
  return damageMainReasonReducer(state, action);
}

export const selectDamageMainReasonGroupData = (state: State) => state.data;
export const selectDamageMainReasonGroupIsValid = (state: State) => state.isValid;
