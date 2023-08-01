import {createReducer, on} from '@ngrx/store';
import {DamageAdditionalInformationGroup} from '../models/damage-additional-information.model';
import {DamageAdditionalInformationPageActions} from '../../damage-additional-information/actions';
import {DamageAdditionalInformation} from '../interfaces/damage-additional-information.interface';

export interface State {
  data: DamageAdditionalInformation;
  isValid: boolean;
}

const initialState = new DamageAdditionalInformationGroup();

const damageAdditionalInformationReducer = createReducer(
  initialState,
  on(
    DamageAdditionalInformationPageActions.patch,
    (state: State, action: ReturnType<typeof DamageAdditionalInformationPageActions.patch>) => ({
      ...state,
      data: { ...state.data, ...action.payload }
    })
  ),
  on(
    DamageAdditionalInformationPageActions.changeValidationStatus,
    (
      state: State,
      { isValid }: ReturnType<typeof DamageAdditionalInformationPageActions.changeValidationStatus>
    ) => ({
      ...state,
      isValid
    })
  )
);

export function reducer(state: State, action: DamageAdditionalInformationPageActions.Union) {
  return damageAdditionalInformationReducer(state, action);
}

export const selectDamageAdditionalInformationGroupData = (state: State) => state.data;
export const selectDamageAdditionalInformationGroupIsValid = (state: State) => state.isValid;
