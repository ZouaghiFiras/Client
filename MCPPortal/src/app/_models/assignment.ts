/**
 * Represents an assignment.
 */
export class Assignment {
  assignmentNumber: string;
  damageDate: Date;
  orderNumber: string;
  caseNumber: string;
  involvedParty: string;
  status: string;
  department: string;

  /**
   * Creates a new Assignment instance.
   * @param assignmentNumber - The assignment number.
   * @param damageDate - The date of the damage.
   * @param orderNumber - The order number.
   * @param caseNumber - The case number.
   * @param involvedParty - The involved party.
   * @param status - The status of the assignment.
   * @param department - The department associated with the assignment.
   */
  constructor(
    assignmentNumber: string,
    damageDate: Date,
    orderNumber: string,
    caseNumber: string,
    involvedParty: string,
    status: string,
    department: string
  ) {
    this.assignmentNumber = assignmentNumber;
    this.damageDate = damageDate;
    this.orderNumber = orderNumber;
    this.caseNumber = caseNumber;
    this.involvedParty = involvedParty;
    this.status = status;
    this.department = department;
  }
}
