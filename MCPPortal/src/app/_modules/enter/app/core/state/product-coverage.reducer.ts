import {createReducer, on} from '@ngrx/store';
import {ProductCoverageGroup} from '../models/product-coverage.model';
import {ProductCoveragePageActions} from '../../product-coverage/actions';
import {ProductCoverage} from '../interfaces/product-coverage.interface';

export interface State {
  data: ProductCoverage;
  isValid: boolean;
}

const initialState = new ProductCoverageGroup();

const productCoverageReducer = createReducer(
  initialState,
  on(
    ProductCoveragePageActions.patch,
    (state: State, action: ReturnType<typeof ProductCoveragePageActions.patch>) => ({
      ...state,
      data: { ...state.data, ...action.payload }
    })
  ),
  on(
    ProductCoveragePageActions.changeValidationStatus,
    (
      state: State,
      { isValid }: ReturnType<typeof ProductCoveragePageActions.changeValidationStatus>
    ) => ({
      ...state,
      isValid
    })
  )
);

export function reducer(state: State, action: ProductCoveragePageActions.Union) {
  return productCoverageReducer(state, action);
}

export const selectProductCoverageGroupData = (state: State) => state.data;
export const selectProductCoverageGroupIsValid = (state: State) => state.isValid;
