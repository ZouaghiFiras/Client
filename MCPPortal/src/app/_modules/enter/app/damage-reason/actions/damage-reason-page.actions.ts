import {createAction, props} from '@ngrx/store';
import {DamageReason} from 'src/app/_modules/enter/app/core/interfaces/damage-reason.interface';

export const patch = createAction(
  '[DamageReason Page] Patch Value',
  props<{ payload: Partial<DamageReason> }>()
);

export const changeValidationStatus = createAction(
  '[DamageReason Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type Union = ReturnType<typeof patch | typeof changeValidationStatus>;


