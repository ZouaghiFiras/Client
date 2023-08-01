import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Assignment, AssignmentDetails, PagingResult, SearchCriteria } from '../_models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private baseUrl = 'https://localhost:7023/Assignment/';

  constructor(public http: HttpClient, private authService: AuthService) {
  }

  /**
   * Fetches assignments based on the specified culture code.
   * @param cultureCode - The culture code for localization.
   * @returns An Observable that emits an array of Assignment objects.
   */
  getAssignments(cultureCode: string): Observable<Assignment[]> {
    const url = `${this.baseUrl}assignments?cultureCode=${cultureCode}`;
    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.get<Assignment[]>(url, { headers });
      }),
      catchError((error) => {
        // Handle error here
        console.error('Error fetching assignments:', error);
        return throwError(error);
      })
    );
  }

  /**
   * Retrieves a paginated list of assignments based on the provided search criteria.
   * @param searchCriteria - The search criteria for filtering assignments.
   * @param cultureCode - The culture code for localization.
   * @param skip - The number of items to skip (optional, default: 0).
   * @param pageSize - The page size (optional, default: 1000).
   * @returns An Observable that emits a PagingResult subObject.
   */
  pageAssignments(
    searchCriteria: SearchCriteria,
    cultureCode: string,
    skip: number = 0,
    pageSize: number = 15
  ): Observable<PagingResult> {
    const url = `${this.baseUrl}paging`;

    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        let params = new HttpParams()
          .set('skip', skip.toString())
          .set('take', pageSize.toString())
          .set('cultureCode', cultureCode);

        if (searchCriteria?.orderNumber) {
          params = params.set('orderNumber', searchCriteria.orderNumber);
        }

        if (searchCriteria?.policyNumber) {
          params = params.set('policyNumber', searchCriteria.policyNumber);
        }

        if (searchCriteria?.caseNumber) {
          params = params.set('caseNumber', searchCriteria.caseNumber);
        }

        if (searchCriteria?.postalCode) {
          params = params.set('postalCode', searchCriteria.postalCode);
        }

        if (searchCriteria?.houseNumber) {
          params = params.set('houseNumber', searchCriteria.houseNumber);
        }

        if (searchCriteria?.assignmentNumber) {
          params = params.set('assignmentNumber', searchCriteria.assignmentNumber);
        }

        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        console.log(token);
        return this.http.get<PagingResult>(url, { params, headers });
      }),
      catchError((error) => {
        // Handle error here
        console.error('Error paging assignments:', error);
        return throwError(error);
      })
    );
  }

  /**
   * Retrieves a  list of work in progress assignments based on the provided search criteria.
   * @param searchCriteria - The search criteria for filtering assignments.
   * @param cultureCode - The culture code for localization.
   * @returns An Observable that emits a List of Assignment Objects Where the work is in progress.
   */
  searchWorkInProgressAssignments(
    searchCriteria: SearchCriteria,
    cultureCode: string,
  ): Observable<Assignment[]> {
    const url = `${this.baseUrl}search/work_in_progress`;

    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        let params = new HttpParams()
          .set('cultureCode', cultureCode);

        if (searchCriteria?.orderNumber) {
          params = params.set('orderNumber', searchCriteria.orderNumber);
        }

        if (searchCriteria?.policyNumber) {
          params = params.set('policyNumber', searchCriteria.policyNumber);
        }

        if (searchCriteria?.caseNumber) {
          params = params.set('caseNumber', searchCriteria.caseNumber);
        }

        if (searchCriteria?.postalCode) {
          params = params.set('postalCode', searchCriteria.postalCode);
        }

        if (searchCriteria?.houseNumber) {
          params = params.set('houseNumber', searchCriteria.houseNumber);
        }

        if (searchCriteria?.assignmentNumber) {
          params = params.set('assignmentNumber', searchCriteria.assignmentNumber);
        }

        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        console.log(token);
        return this.http.get<Assignment[]>(url, { params, headers });
      }),
      catchError((error) => {
        // Handle error here
        console.error('Error paging assignments:', error);
        return throwError(error);
      })
    );
  }

  /**
   * Retrieves a  list of assignments based on the provided search criteria.
   * @param searchCriteria - The search criteria for filtering assignments.
   * @param cultureCode - The culture code for localization.
   * @returns An Observable that emits a List of Assignment Objects.
   */
  searchAssignments(
    searchCriteria: SearchCriteria,
    cultureCode: string,
  ): Observable<Assignment[]> {
    const url = `${this.baseUrl}search`;

    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        let params = new HttpParams()
          .set('cultureCode', cultureCode);

        if (searchCriteria?.orderNumber) {
          params = params.set('orderNumber', searchCriteria.orderNumber);
        }

        if (searchCriteria?.policyNumber) {
          params = params.set('policyNumber', searchCriteria.policyNumber);
        }

        if (searchCriteria?.caseNumber) {
          params = params.set('caseNumber', searchCriteria.caseNumber);
        }

        if (searchCriteria?.postalCode) {
          params = params.set('postalCode', searchCriteria.postalCode);
        }

        if (searchCriteria?.houseNumber) {
          params = params.set('houseNumber', searchCriteria.houseNumber);
        }

        if (searchCriteria?.assignmentNumber) {
          params = params.set('assignmentNumber', searchCriteria.assignmentNumber);
        }

        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        console.log(token);
        return this.http.get<Assignment[]>(url, { params, headers });
      }),
      catchError((error) => {
        // Handle error here
        console.error('Error paging assignments:', error);
        return throwError(error);
      })
    );
  }


  /**
   * Retrieves the details of an assignment based on the assignment number and culture code.
   * @param assignmentNumber - The assignment number.
   * @param cultureCode - The culture code for localization.
   * @returns An Observable that emits an AssignmentDetails subObject.
   */
  getAssignmentDetails(assignmentNumber: string, cultureCode: string): Observable<AssignmentDetails> {
    const url = `${this.baseUrl}details?assignmentNumber=${assignmentNumber}&cultureCode=${cultureCode}`;

    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.get<AssignmentDetails>(url, { headers });
      }),
      catchError((error) => {
        // Handle error here
        console.error('Error fetching assignment details:', error);
        return throwError(error);
      })
    );
  }
}
