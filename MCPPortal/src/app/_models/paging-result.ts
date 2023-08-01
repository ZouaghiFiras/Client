import {Assignment} from './assignment';

/**
 * Represents the result of a paged assignment search.
 */
export class PagingResult {
  assignments: Assignment[]; // Array of assignments
  total: number; // Total number of assignments

  /**
   * Constructs a new PagingResult instance.
   * @param assignments - Array of assignments
   * @param total - Total number of assignments
   */
  constructor(assignments: Assignment[], total: number) {
    this.assignments = assignments;
    this.total = total;
  }
}
