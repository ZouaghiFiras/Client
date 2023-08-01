import {createAction, props} from '@ngrx/store';
import {AdditionalReportingForm} from 'src/app/_modules/enter/app/core/interfaces/additional-reporting-form.interface';

export const patch = createAction(
  '[AdditionalReportingForm Page] Patch Value',
  props<{ payload: Partial<AdditionalReportingForm> }>()
);

export const changeValidationStatus = createAction(
  '[AdditionalReportingForm Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type Union = ReturnType<typeof patch | typeof changeValidationStatus>;


