import {createReducer, on} from '@ngrx/store';
import {ObjectGroup} from '../models/object.model';
import {ObjectPageActions} from '../../Object/actions';
import {Object} from '../interfaces/object.interface';

export interface State {
  // tslint:disable-next-line:ban-types
  data: Object;
  isValid: boolean;
}

const initialState = new ObjectGroup();

const objectReducer = createReducer(
  initialState,
  on(
    ObjectPageActions.patch,
    (state: State, action: ReturnType<typeof ObjectPageActions.patch>) => ({
      ...state,
      data: { ...state.data, ...action.payload }
    })
  ),
  on(
    ObjectPageActions.changeValidationStatus,
    (
      state: State,
      { isValid }: ReturnType<typeof ObjectPageActions.changeValidationStatus>
    ) => ({
      ...state,
      isValid
    })
  )
);

export function reducer(state: State, action: ObjectPageActions.Union) {
  return objectReducer(state, action);
}

export const selectObjectGroupData = (state: State) => state.data;
export const selectObjectGroupIsValid = (state: State) => state.isValid;
