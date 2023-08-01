import {createAction, props} from '@ngrx/store';
import {DamageAdditionalInformation} from 'src/app/_modules/enter/app/core/interfaces/damage-additional-information.interface';

export const patch = createAction(
  '[DamageAdditionalInformation Page] Patch Value',
  props<{ payload: Partial<DamageAdditionalInformation> }>()
);

export const changeValidationStatus = createAction(
  '[DamageAdditionalInformation Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type Union = ReturnType<typeof patch | typeof changeValidationStatus>;


