import {createAction, props} from '@ngrx/store';
import {AdditionalDeliveryMethod} from 'src/app/_modules/enter/app/core/interfaces/additional-delivery-method.interface';

export const patch = createAction(
  '[AdditionalDeliveryMethod Page] Patch Value',
  props<{ payload: Partial<AdditionalDeliveryMethod> }>()
);

export const changeValidationStatus = createAction(
  '[AdditionalDeliveryMethod Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type Union = ReturnType<typeof patch | typeof changeValidationStatus>;


