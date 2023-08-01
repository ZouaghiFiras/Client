import {createAction, props} from '@ngrx/store';
import {Party} from 'src/app/_modules/enter/app/core/interfaces/party.interface';

export const patch = createAction(
  '[Party Page] Patch Value',
  props<{ payload: Partial<Party> }>()
);

export const changeValidationStatus = createAction(
  '[Party Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type Union = ReturnType<typeof patch | typeof changeValidationStatus>;


