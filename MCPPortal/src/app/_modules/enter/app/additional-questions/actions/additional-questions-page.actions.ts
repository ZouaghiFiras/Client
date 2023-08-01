import {createAction, props} from '@ngrx/store';
import {AdditionalQuestions} from 'src/app/_modules/enter/app/core/interfaces/additional-questions.interface';

export const patch = createAction(
  '[AdditionalQuestions Page] Patch Value',
  props<{ payload: Partial<AdditionalQuestions> }>()
);

export const changeValidationStatus = createAction(
  '[AdditionalQuestions Page] Change Validation Status',
  props<{ isValid: boolean }>()
);

export type Union = ReturnType<typeof patch | typeof changeValidationStatus>;


