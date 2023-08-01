import {createAction, props} from '@ngrx/store';
import {AdditionalActivities} from 'src/app/_modules/enter/app/core/interfaces/additional-activities.interface';

export const patch = createAction(
  '[AdditionalActivities Page] Patch Value',
  props<{ payload: Partial<AdditionalActivities> }>()
);

export const changeValidationStatus = createAction(
  '[AdditionalActivities Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type Union = ReturnType<typeof patch | typeof changeValidationStatus>;


