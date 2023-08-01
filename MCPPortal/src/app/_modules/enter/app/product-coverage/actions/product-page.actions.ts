import {createAction, props} from '@ngrx/store';
import {ProductCoverage} from '../../core/interfaces/product-coverage.interface';

export const patch = createAction(
  '[ProductCoverage Page] Patch Value',
  props<{ payload: Partial<ProductCoverage> }>()
);

export const changeValidationStatus = createAction(
  '[ProductCoverage Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type Union = ReturnType<typeof patch | typeof changeValidationStatus>;



