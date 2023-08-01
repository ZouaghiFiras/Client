import {createAction, props} from '@ngrx/store';
import {AdditionalDocuments} from 'src/app/_modules/enter/app/core/interfaces/additional-documents.interface';

export const patch = createAction(
  '[AdditionalDocuments Page] Patch Value',
  props<{ payload: Partial<AdditionalDocuments> }>()
);

export const changeValidationStatus = createAction(
  '[AdditionalDocuments Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type Union = ReturnType<typeof patch | typeof changeValidationStatus>;


