import {PartyData} from './partydata';

/**
 * Represents details of an assignment.
 */
export class AssignmentDetails {
  handler: string;
  status: string;
  policyNumber: string;
  insuredAmount: number;
  ownRisk: number;
  policyConditions: string;
  damageNumber: string;
  damageDate: Date;
  estimatedDamageAmount: number;
  recovery: boolean;
  department: string;
  workActivity: string;
  activityExecution: string;
  reportingForm: string;
  object: string;
  cause: string;
  coverage: string;
  product: string;
  client: string;
  contactPerson: string;
  contactPersonEmail: string;
  intakeMethod: string;
  deedOfAssignment: string;
  expert: string;
  visitDate: Date;
  parties: PartyData[];

  /**
   * Creates a new AssignmentDetails instance.
   * @param handler - The handler of the assignment.
   * @param status - The status of the assignment.
   * @param policyNumber - The policy number associated with the assignment.
   * @param insuredAmount - The insured amount.
   * @param ownRisk - The own risk amount.
   * @param policyConditions - The policy conditions.
   * @param damageNumber - The damage number.
   * @param damageDate - The date of the damage.
   * @param estimatedDamageAmount - The estimated damage amount.
   * @param recovery - Indicates if there is a recovery process.
   * @param department - The department associated with the assignment.
   * @param workActivity - The work activity.
   * @param activityExecution - The activity execution.
   * @param reportingForm - The reporting form.
   * @param object - The subObject associated with the assignment.
   * @param cause - The cause of the assignment.
   * @param coverage - The coverage details.
   * @param product - The product details.
   * @param client - The client details.
   * @param contactPerson - The contact person's name.
   * @param contactPersonEmail - The contact person's email.
   * @param intakeMethod - The intake method.
   * @param deedOfAssignment - The deed of assignment details.
   * @param expert - The expert associated with the assignment.
   * @param visitDate - The date of the visit.
   * @param parties - An array of party data associated with the assignment.
   */
  constructor(
    handler: string,
    status: string,
    policyNumber: string,
    insuredAmount: number,
    ownRisk: number,
    policyConditions: string,
    damageNumber: string,
    damageDate: Date,
    estimatedDamageAmount: number,
    recovery: boolean,
    department: string,
    workActivity: string,
    activityExecution: string,
    reportingForm: string,
    object: string,
    cause: string,
    coverage: string,
    product: string,
    client: string,
    contactPerson: string,
    contactPersonEmail: string,
    intakeMethod: string,
    deedOfAssignment: string,
    expert: string,
    visitDate: Date,
    parties: PartyData[]
  ) {
    this.handler = handler;
    this.status = status;
    this.policyNumber = policyNumber;
    this.insuredAmount = insuredAmount;
    this.ownRisk = ownRisk;
    this.policyConditions = policyConditions;
    this.damageNumber = damageNumber;
    this.damageDate = damageDate;
    this.estimatedDamageAmount = estimatedDamageAmount;
    this.recovery = recovery;
    this.department = department;
    this.workActivity = workActivity;
    this.activityExecution = activityExecution;
    this.reportingForm = reportingForm;
    this.object = object;
    this.cause = cause;
    this.coverage = coverage;
    this.product = product;
    this.client = client;
    this.contactPerson = contactPerson;
    this.contactPersonEmail = contactPersonEmail;
    this.intakeMethod = intakeMethod;
    this.deedOfAssignment = deedOfAssignment;
    this.expert = expert;
    this.visitDate = visitDate;
    this.parties = parties;
  }
}

