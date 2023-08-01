import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Assignment, PagingResult, SearchCriteria} from '../_models';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private data: BehaviorSubject<PagingResult> = new BehaviorSubject<PagingResult>(null);
  private dataResults: BehaviorSubject<Assignment[]> = new BehaviorSubject<Assignment[]>(null);
  private criteria: BehaviorSubject<SearchCriteria> = new BehaviorSubject<SearchCriteria>(null);

  constructor() {
  }

  /**
   * Sets the new data for search results.
   * @param newData - The new result data.
   */
  setDataResults(newData: Assignment[]): void {
    this.dataResults.next(newData);
  }
  /**
   * Sets the new data for search results.
   * @param newData - The new paging result data.
   */
  setData(newData: PagingResult): void {
    this.data.next(newData);
  }

  /**
   * Sets the new search criteria.
   * @param newData - The new search criteria.
   */
  setCriteria(newData: SearchCriteria): void {
    this.criteria.next(newData);
  }

  /**
   * Retrieves the observable for search data.
   * @returns An Observable emitting the search data.
   */
  getDataResults(): Observable<Assignment[]> {
    return this.dataResults;
  }

  /**
   * Retrieves the observable for search data.
   * @returns An Observable emitting the search data.
   */
  getData(): Observable<PagingResult> {
    return this.data;
  }

  /**
   * Retrieves the observable for search criteria.
   * @returns An Observable emitting the search criteria.
   */
  getCriteria(): Observable<SearchCriteria> {
    return this.criteria;
  }
}
