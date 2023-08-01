import {createAction, props} from '@ngrx/store';
import {ReporterSelection} from '../../core/interfaces/reporter-selection.interface';

export const patch = createAction(
  '[ReporterSelection Page] Patch Value',
  props<{ payload: Partial<ReporterSelection> }>()
);

export const changeValidationStatus = createAction(
  '[ReporterSelection Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type Union = ReturnType<typeof patch | typeof changeValidationStatus>;
