import {Party} from '../interfaces/party.interface';

export class PartyGroup {
  data = {
    partyType: '',
    partyRole: '',
    country: '',
    postalCode: '',
    houseNumber: '',
    suffix: '',
    street: '',
    city: '',
    email: '',
    phone1: '',
    phone2: '',
    phone3: '',
  } as Party;
  isValid = false;
}
