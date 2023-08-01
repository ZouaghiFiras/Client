import {createReducer, on} from '@ngrx/store';
import {AdditionalDeliveryMethodPageActions} from 'src/app/_modules/enter/app/additional-delivery-method/actions';
import {AdditionalDeliveryMethodGroup} from '../models/additional-delivery-method.model';
import {AdditionalDeliveryMethod} from '../interfaces/additional-delivery-method.interface';

export interface State {
  data: AdditionalDeliveryMethod;
  isValid: boolean;
}

const initialState = new AdditionalDeliveryMethodGroup();

const additionalDeliveryMethodReducer = createReducer(
  initialState,
  on(
    AdditionalDeliveryMethodPageActions.patch,
    (state: State, action: ReturnType<typeof AdditionalDeliveryMethodPageActions.patch>) => ({
      ...state,
      data: { ...state.data, ...action.payload }
    })
  ),
  on(
    AdditionalDeliveryMethodPageActions.changeValidationStatus,
    (
      state: State,
      { isValid }: ReturnType<typeof AdditionalDeliveryMethodPageActions.changeValidationStatus>
    ) => ({
      ...state,
      isValid
    })
  )
);

export function reducer(state: State, action: AdditionalDeliveryMethodPageActions.Union) {
  return additionalDeliveryMethodReducer(state, action);
}

export const selectAdditionalDeliveryMethodGroupData = (state: State) => state.data;
export const selectAdditionalDeliveryMethodGroupIsValid = (state: State) => state.isValid;
