import {createAction, props} from '@ngrx/store';
import {Object} from 'src/app/_modules/enter/app/core/interfaces/object.interface';

export const patch = createAction(
  '[Object Page] Patch Value',
  // tslint:disable-next-line:ban-types
  props<{ payload: Partial<Object> }>()
);

export const changeValidationStatus = createAction(
  '[Object Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type Union = ReturnType<typeof patch | typeof changeValidationStatus>;


