import {createAction, props} from '@ngrx/store';
import {DamageSubReason} from 'src/app/_modules/enter/app/core/interfaces/damage-sub-reason.interface';

export const patch = createAction(
  '[DamageSubReason Page] Patch Value',
  props<{ payload: Partial<DamageSubReason> }>()
);

export const changeValidationStatus = createAction(
  '[DamageSubReason Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type Union = ReturnType<typeof patch | typeof changeValidationStatus>;


