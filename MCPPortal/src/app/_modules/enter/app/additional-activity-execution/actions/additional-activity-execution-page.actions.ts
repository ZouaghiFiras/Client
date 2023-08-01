import {createAction, props} from '@ngrx/store';
import {AdditionalActivityExecution} from 'src/app/_modules/enter/app/core/interfaces/additional-activity-execution.interface';

export const patch = createAction(
  '[AdditionalActivityExecution Page] Patch Value',
  props<{ payload: Partial<AdditionalActivityExecution> }>()
);

export const changeValidationStatus = createAction(
  '[AdditionalActivityExecution Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type Union = ReturnType<typeof patch | typeof changeValidationStatus>;


