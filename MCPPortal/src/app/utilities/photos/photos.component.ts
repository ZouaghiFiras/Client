import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AssignmentService} from '../../_services';
import {TranslateService} from '@ngx-translate/core';
import {AssignmentDetails} from '../../_models';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  public isLoading = true;
  public assignmentId: string;
  public assignmentDetails: AssignmentDetails;

  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private languageService: TranslateService
  ) {
  }

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
    this.assignmentId = this.route.snapshot.paramMap.get('id');
    this.getAssignmentDetails();
  }

  /**
   * Retrieves assignment details.
   * Sets isLoading to true when fetching assignment details and sets it to false when details are fetched or an error occurs.
   */
  private getAssignmentDetails(): void {
    this.isLoading = true;
    this.assignmentService.getAssignmentDetails(this.assignmentId, this.getLanguage())
      .subscribe(
        result => {
          this.assignmentDetails = result;
          this.isLoading = false;
        },
        error => {
          console.error(error);
          this.isLoading = false;
        }
      );
  }

  /**
   * Retrieves the current language for assignment details.
   * Returns the current language if available, otherwise returns the browser's culture language.
   * @returns The language code.
   */
  private getLanguage(): string {
    return this.languageService.currentLang ? this.languageService.currentLang : this.languageService.getBrowserCultureLang();
  }
}
