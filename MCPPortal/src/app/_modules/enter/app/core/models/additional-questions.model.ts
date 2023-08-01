import {AdditionalQuestions} from '../interfaces/additional-questions.interface';

export class AdditionalQuestionsGroup {
  data = {
    damageRepaired: '',
    policeReportAvailable: '',
    clientQuestion: '',
  } as AdditionalQuestions;
  isValid = false;
}
