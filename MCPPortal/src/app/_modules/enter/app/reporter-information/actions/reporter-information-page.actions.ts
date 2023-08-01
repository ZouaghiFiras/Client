import {createAction, props} from '@ngrx/store';
import {ReporterInformation} from 'src/app/_modules/enter/app/core/interfaces/reporter-information.interface';

export const patch = createAction(
  '[ReporterInformation Page] Patch Value',
  props<{ payload: Partial<ReporterInformation> }>()
);

export const changeValidationStatus = createAction(
  '[ReporterInformation Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type Union = ReturnType<typeof patch | typeof changeValidationStatus>;
