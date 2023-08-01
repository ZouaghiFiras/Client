import {Component, OnInit} from '@angular/core';
import {catchError, finalize, tap} from 'rxjs/operators';
import {DataStateChangeEvent, PageChangeEvent, SelectionEvent} from '@progress/kendo-angular-grid';
import {Assignment, SearchCriteria, Selector, Status} from '../../../../_models';
import {AssignmentService, SearchService} from '../../../../_services';
import {Router} from '@angular/router';
import {DataSourceRequestState, SortDescriptor} from '@progress/kendo-data-query';
import {throwError} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';


/**
 * Component for displaying search results.
 */
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
})
export class SearchResultsComponent implements OnInit {
  criteria: SearchCriteria;
  allAssignments: Assignment[] = [];
  isLoading = false;
  empty = true;

  public gridData: any[] = [];
  public state: DataSourceRequestState = {
    skip: 0,
    take: 10,
  };
  iconPDF = 'k-i-pdf';
  iconExcel = 'k-i-excel';

  constructor(
    private languageService: TranslateService,
    private assignmentService: AssignmentService,
    private router: Router,
    private searchService: SearchService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getCriteria();
    this.loadResults();
    this.loadAllAssignments();
  }
  /**
   * Loads all assignments from the server and stores them in the `allAssignments` array.
   *
   * @returns void
   */
  private loadAllAssignments(): void {
    // Get the current language code
    const cultureCode = this.languageService.currentLang ? this.languageService.currentLang : this.languageService.getBrowserCultureLang();

    // Set the `isLoading` flag to indicate that assignments are being loaded
    this.isLoading = true;

    // Fetch all the assignments from the server
    this.assignmentService.getAssignments ( cultureCode ).pipe (
      // Save the assignments in the `allAssignments` array
      tap ( ( assignments: Assignment[] ) => {
        this.allAssignments = assignments;
      } ) ,
      // Handle errors that may occur during fetching
      catchError ( ( error ) => {
        // Log the error to the console
        console.error ( 'Error loading assignments:' , error );
        // Return an error observable
        return throwError ( error );
      } ) ,
      // Indicate that assignments have finished loading
      finalize ( () => {
        this.isLoading = false;
      } )
    ).subscribe ();
  }
  /**
   * This method takes a Selector enum value and returns the number of assignments that match the corresponding filter criteria.
   * @param selector A Selector enum value that indicates the filter criteria to use.
   * @returns The number of assignments that match the filter criteria.
   */
  getNumberOfAssignments( selector: Selector ): number {
    // Use a switch statement to determine which filter criteria to use based on the value of the selector parameter.
    switch ( selector ) {
      // If the selector is Selector.ALL, return the total number of assignments in the allAssignments array.
      case Selector.ALL:
        return this.allAssignments.length;
      // If the selector is Selector.WORK_IN_PROGRESS, return the total number of assignments that are in progress.
      case Selector.WORK_IN_PROGRESS:
        return (
          this.getNumberOfAssignmentsPerStatus ( Status.New ) +
          this.getNumberOfAssignmentsPerStatus ( Status.Planned ) +
          this.getNumberOfAssignmentsPerStatus ( Status.ToPlan ) +
          this.getNumberOfAssignmentsPerStatus ( Status.Handling )
        );
      // If the selector is Selector.APPOINTMENT_VISITS, return the number of assignments that are in the "to plan" status.
      case Selector.APPOINTMENT_VISITS:
        return this.getNumberOfAssignmentsPerStatus ( Status.ToPlan );
      // If the selector is Selector.TO_VISIT, return the number of assignments that are in the "planned" status.
      case Selector.TO_VISIT:
        return this.getNumberOfAssignmentsPerStatus ( Status.Planned );
      // If the selector is Selector.EXPERTISE, return the number of assignments that are in the "handling" status.
      case Selector.EXPERTISE:
        return this.getNumberOfAssignmentsPerStatus ( Status.Handling );
      // If the selector is Selector.TO_CHECK, return the number of assignments that are in the "new" status.
      case Selector.TO_CHECK:
        return this.getNumberOfAssignmentsPerStatus ( Status.New );
      // If the selector is Selector.CANCELLED, return the number of assignments that are in the "cancelled" status.
      case Selector.CANCELLED:
        return this.getNumberOfAssignmentsPerStatus ( Status.Cancelled );
      // If the selector is Selector.CLOSED, return the number of assignments that are in the "closed" status.
      case Selector.CLOSED:
        return this.getNumberOfAssignmentsPerStatus ( Status.Closed );
      // If the selector is an invalid value, return 0.
      default:
        return 0;
    }
  }

  /**
   * This method takes a Status enum value and returns the number of assignments that have that status.
   * @param status A Status enum value indicating the status to filter by.
   * @returns The number of assignments that have the specified status.
   */
  private getNumberOfAssignmentsPerStatus( status: Status ): number {
    // Use the filter method to create a new array containing only the assignments that have the specified status.
    const filteredAssignments = this.allAssignments.filter (
      assignment => assignment.status === status
    );

    // Return the length of the filtered array, which is equal to the number of assignments with the specified status.
    return filteredAssignments.length;
  }
  /**
   * This method returns the assignments that have that criteria.
   * @returns The number of assignments that have the specified status.
   */
  public fetchData(): void {
    let searchCriteria = null;
    this.searchService.getCriteria().subscribe(next => {
      searchCriteria = next;
    });
    const currentLang = this.languageService.currentLang;
    this.assignmentService.searchAssignments(searchCriteria, currentLang)
      .subscribe((result) => {
        this.gridData = result;
        if (this.gridData.length){
          this.empty = false;
        }
      });
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }

  getCriteria(): void {
    this.isLoading = true;
    this.searchService.getCriteria()
      .pipe(
        tap((criteria: SearchCriteria) => {
          this.criteria = criteria;
        }),
        catchError((error) => {
          console.error('Error loading search criteria:', error);
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  private loadResults(): void {
    this.isLoading = true;

    this.searchService.getDataResults()
      .pipe(
        tap((result) => {
          if (result) {
            this.gridData = result;
            if (this.gridData.length){
              this.empty = false;
            }
          } else {
            this.fetchData();
          }
        }),
        catchError((error) => {
          console.error('Error loading search results:', error);
          return throwError(error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  /**
   * Event handler for the selectionChange event that navigates to the details page for the selected assignment.
   * @param event The SelectionEvent subObject containing information about the selected rows.
   */
  onSelectionChange( event: SelectionEvent ): void {
    const selectedRows = event.selectedRows;
    if ( selectedRows.length > 0 ) {
      const selectedRow = selectedRows[ 0 ].dataItem;
      this.router.navigate ( [ '/consult/' , selectedRow.assignmentNumber ] );
    }
  }
}
