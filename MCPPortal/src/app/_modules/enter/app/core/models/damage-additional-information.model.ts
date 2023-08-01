import {DamageAdditionalInformation} from '../interfaces/damage-additional-information.interface';

export class DamageAdditionalInformationGroup {
  data = {
    caseNumber: '',
    orderNumber: '',
    rightOfRecovery: false,
    estimatedDamageAmount: '',
    damageDateUnknown: false,
    damageDate: new Date(),
    additionalExplanation: '',
  } as DamageAdditionalInformation;
  isValid = false;
}
