import {createReducer, on} from '@ngrx/store';
import {ProductActivityGroup} from '../models/product-activity.model';
import {ProductActivityPageActions} from '../../product-activity/actions';
import {ProductActivity} from '../interfaces/product-activity.interface';

export interface State {
  data: ProductActivity;
  isValid: boolean;
}

const initialState = new ProductActivityGroup();

const productActivityReducer = createReducer(
  initialState,
  on(
    ProductActivityPageActions.patch,
    (state: State, action: ReturnType<typeof ProductActivityPageActions.patch>) => ({
      ...state,
      data: { ...state.data, ...action.payload }
    })
  ),
  on(
    ProductActivityPageActions.changeValidationStatus,
    (
      state: State,
      { isValid }: ReturnType<typeof ProductActivityPageActions.changeValidationStatus>
    ) => ({
      ...state,
      isValid
    })
  )
);

export function reducer(state: State, action: ProductActivityPageActions.Union) {
  return productActivityReducer(state, action);
}

export const selectProductActivityGroupData = (state: State) => state.data;
export const selectProductActivityGroupIsValid = (state: State) => state.isValid;
