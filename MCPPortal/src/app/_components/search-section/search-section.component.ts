import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AssignmentService, SearchService} from '../../_services';
import {Router} from '@angular/router';
import {Assignment, PagingResult, SearchCriteria} from '../../_models';
import {TranslateService} from '@ngx-translate/core';

/**
 * Component representing the search section.
 */
@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
})
export class SearchSectionComponent implements OnInit {
  public searchForm: FormGroup;
  public data: PagingResult;
  public dataResults: Assignment[];
  private criteria: SearchCriteria = new SearchCriteria();

  constructor(
    private formBuilder: FormBuilder,
    private assignmentService: AssignmentService,
    private router: Router,
    private searchService: SearchService,
    private languageService: TranslateService
  ) {
  }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.clearForm();
  }

  /**
   * Updates the search data in the search service.
   * @param data - The search results.
   */
  updateData(data: Assignment[]): void {
    this.searchService.setDataResults(data);
  }

  /**
   * Handles the search form submission.
   */
  onSubmit(): void {
    const cultureCode = this.languageService.currentLang ? this.languageService.currentLang : this.languageService.getBrowserCultureLang();
    this.criteria = this.searchForm.value;
    this.searchService.setCriteria(this.criteria);
    this.assignmentService.searchAssignments(this.criteria, cultureCode)
      .subscribe((result) => {
          this.dataResults = result;
          this.updateData(this.dataResults);
          console.log(this.data);
          this.router.navigateByUrl('/consult').then();
          console.log('/consult');
        },
        (error) => {
          console.error('Error occurred during search:', error);
          // Handle the error appropriately (e.g., show error message to the user)
        });
  }

  /**
   * Handles the search for work in progress form submission.
   */
  onSubmitWorkInProgress(): void {
    const cultureCode = this.languageService.currentLang ? this.languageService.currentLang : this.languageService.getBrowserCultureLang();
    this.criteria = this.searchForm.value;
    this.searchService.setCriteria(this.criteria);
    this.assignmentService.searchWorkInProgressAssignments(this.criteria, cultureCode)
      .subscribe((result) => {
          this.dataResults = result;
          this.updateData(this.dataResults);
          console.log(this.data);
          this.router.navigateByUrl('/consult').then();
          console.log('/consult');
        },
        (error) => {
          console.error('Error occurred during search:', error);
          // Handle the error appropriately (e.g., show error message to the user)
        });
  }

  /**
   * Resets the search form and search criteria.
   */
  clearForm(): void {
    this.searchForm = this.formBuilder.group({
      orderNumber: ['', Validators.pattern('[a-zA-Z0-9]+')],
      policyNumber: ['', Validators.pattern('[a-zA-Z0-9]+')],
      caseNumber: ['', Validators.pattern('[a-zA-Z0-9]+')],
      postalCode: ['', Validators.pattern('[a-zA-Z0-9]+')],
      houseNumber: ['', Validators.pattern('[a-zA-Z0-9]+')],
      assignmentNumber: ['', Validators.pattern('[a-zA-Z0-9]+')]
    });
    this.criteria = {
      orderNumber: '',
      policyNumber: '',
      caseNumber: '',
      postalCode: '',
      houseNumber: '',
      assignmentNumber: ''
    };
  }
}
