/* tslint:disable:ban-types */
import {Object} from '../interfaces/object.interface';

export class ObjectGroup {
  data = {
    mainObject: '',
    object: '',
    subObject: '',
    locatedAtPartyAddress: '',
    party: '',
    damageLocation: '',
    coverage: '',
    policyNumber: '',
    deductibleExcess: '',
    insuredAmount: '',
    policyConditions: '',
    deedOfAssignment: '',
    startDateKnown: true,
    policyDuration: '',
    guaranteeAgainstUnderinsurance: true,
    includingExcludingVAT:  '',
  } as Object;
  isValid = false;
}
