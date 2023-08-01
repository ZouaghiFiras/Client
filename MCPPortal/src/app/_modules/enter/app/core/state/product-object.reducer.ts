import {createReducer, on} from '@ngrx/store';
import {ProductObjectGroup} from '../models/product-object.model';
import {ProductObjectPageActions} from '../../product-object/actions';
import {ProductObject} from '../interfaces/product-object.interface';

export interface State {
  data: ProductObject;
  isValid: boolean;
}

const initialState = new ProductObjectGroup();

const productObjectReducer = createReducer(
  initialState,
  on(
    ProductObjectPageActions.patch,
    (state: State, action: ReturnType<typeof ProductObjectPageActions.patch>) => ({
      ...state,
      data: { ...state.data, ...action.payload }
    })
  ),
  on(
    ProductObjectPageActions.changeValidationStatus,
    (
      state: State,
      { isValid }: ReturnType<typeof ProductObjectPageActions.changeValidationStatus>
    ) => ({
      ...state,
      isValid
    })
  )
);

export function reducer(state: State, action: ProductObjectPageActions.Union) {
  return productObjectReducer(state, action);
}

export const selectProductObjectGroupData = (state: State) => state.data;
export const selectProductObjectGroupIsValid = (state: State) => state.isValid;
