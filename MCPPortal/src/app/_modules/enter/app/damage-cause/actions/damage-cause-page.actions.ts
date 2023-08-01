import {createAction, props} from '@ngrx/store';
import {DamageCause} from 'src/app/_modules/enter/app/core/interfaces/damage-cause.interface';

export const patch = createAction(
  '[DamageCause Page] Patch Value',
  props<{ payload: Partial<DamageCause> }>()
);

export const changeValidationStatus = createAction(
  '[DamageCause Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type Union = ReturnType<typeof patch | typeof changeValidationStatus>;


