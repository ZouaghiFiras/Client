import {createReducer, on} from '@ngrx/store';
import {ProductSubObjectGroup} from '../models/product-sub-object.model';
import {ProductSubObjectPageActions} from '../../product-sub-object/actions';
import {ProductSubObject} from '../interfaces/product-sub-object.interface';

export interface State {
  data: ProductSubObject;
  isValid: boolean;
}

const initialState = new ProductSubObjectGroup();

const productSubObjectReducer = createReducer(
  initialState,
  on(
    ProductSubObjectPageActions.patch,
    (state: State, action: ReturnType<typeof ProductSubObjectPageActions.patch>) => ({
      ...state,
      data: { ...state.data, ...action.payload }
    })
  ),
  on(
    ProductSubObjectPageActions.changeValidationStatus,
    (
      state: State,
      { isValid }: ReturnType<typeof ProductSubObjectPageActions.changeValidationStatus>
    ) => ({
      ...state,
      isValid
    })
  )
);

export function reducer(state: State, action: ProductSubObjectPageActions.Union) {
  return productSubObjectReducer(state, action);
}

export const selectProductSubObjectGroupData = (state: State) => state.data;
export const selectProductSubObjectGroupIsValid = (state: State) => state.isValid;
