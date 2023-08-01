import {ReporterInformation} from '../interfaces/reporter-information.interface';

export class ReporterInformationGroup {
  data = {
    contactMethod: '',
    salutation: '',
    firstName: '',
    prefix: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  } as ReporterInformation;
  isValid = false;
}
