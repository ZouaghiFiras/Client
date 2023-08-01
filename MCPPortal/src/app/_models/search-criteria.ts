/**
 * Represents the search criteria for assignment search.
 */
export class SearchCriteria {
  orderNumber: string;
  policyNumber: string;
  caseNumber: string;
  postalCode: string;
  houseNumber: string;
  assignmentNumber: string;

  /**
   * Constructs a new SearchCriteria instance.
   */
  constructor() {
    this.orderNumber = '';
    this.policyNumber = '';
    this.caseNumber = '';
    this.postalCode = '';
    this.houseNumber = '';
    this.assignmentNumber = '';
  }
}
