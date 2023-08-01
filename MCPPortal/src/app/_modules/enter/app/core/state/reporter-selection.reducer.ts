import {createReducer, on} from '@ngrx/store';
import {ReporterSelectionGroup} from '../models/reporter-selection.model';
import {ReporterSelectionPageActions} from '../../reporter-selection/actions';
import {ReporterSelection} from '../interfaces/reporter-selection.interface';

export interface State {
  data: ReporterSelection;
  isValid: boolean;
}

const initialState = new ReporterSelectionGroup();

const reporterSelectionReducer = createReducer(
  initialState,
  on(
    ReporterSelectionPageActions.patch,
    (state, action) => ({
      ...state,
      data: { ...state.data, ...action.payload }
    })
  ),
  on(
    ReporterSelectionPageActions.changeValidationStatus,
    (state, { isValid }) => ({
      ...state,
      isValid
    })
  ));


export function reducer(state: State, action: ReporterSelectionPageActions.Union) {
  return reporterSelectionReducer(state, action);
}

export const selectReporterSelectionGroupData = (state: State) => state.data;
export const selectReporterSelectionGroupIsValid = (state: State) => state.isValid;
