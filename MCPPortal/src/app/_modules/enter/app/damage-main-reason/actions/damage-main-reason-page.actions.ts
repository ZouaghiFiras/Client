import {createAction, props} from '@ngrx/store';
import {DamageMainReason} from 'src/app/_modules/enter/app/core/interfaces/damage-main-reason.interface';

export const patch = createAction(
  '[DamageMainReason Page] Patch Value',
  props<{ payload: Partial<DamageMainReason> }>()
);

export const changeValidationStatus = createAction(
  '[DamageMainReason Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type Union = ReturnType<typeof patch | typeof changeValidationStatus>;


