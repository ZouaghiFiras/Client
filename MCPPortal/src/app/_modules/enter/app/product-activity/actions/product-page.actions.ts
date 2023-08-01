import {createAction, props} from '@ngrx/store';
import {ProductActivity} from 'src/app/_modules/enter/app/core/interfaces/product-activity.interface';

export const patch = createAction(
  '[ProductActivity Page] Patch Value',
  props<{ payload: Partial<ProductActivity> }>()
);

export const changeValidationStatus = createAction(
  '[ProductActivity Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type Union = ReturnType<typeof patch | typeof changeValidationStatus>;



