import {createAction, props} from '@ngrx/store';
import {ProductObject} from 'src/app/_modules/enter/app/core/interfaces/product-object.interface';

export const patch = createAction(
  '[ProductObject Page] Patch Value',
  props<{ payload: Partial<ProductObject> }>()
);

export const changeValidationStatus = createAction(
  '[ProductObject Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type Union = ReturnType<typeof patch | typeof changeValidationStatus>;



