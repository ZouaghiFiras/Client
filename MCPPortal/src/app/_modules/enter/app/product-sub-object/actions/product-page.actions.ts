import {createAction, props} from '@ngrx/store';
import {ProductSubObject} from 'src/app/_modules/enter/app/core/interfaces/product-sub-object.interface';

export const patch = createAction(
  '[ProductSubObject Page] Patch Value',
  props<{ payload: Partial<ProductSubObject> }>()
);

export const changeValidationStatus = createAction(
  '[ProductSubObject Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type Union = ReturnType<typeof patch | typeof changeValidationStatus>;



