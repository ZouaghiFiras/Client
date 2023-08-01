import {Component, OnInit} from '@angular/core';
import {AssignmentDetails} from '../../../_models';
import {ActivatedRoute, Router} from '@angular/router';
import {AssignmentService} from '../../../_services';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  public assignmentId: string;
  public assignmentDetails: AssignmentDetails;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private languageService: TranslateService
  ) {
  }

  /**
   * Initializes the component.
   * Retrieves the assignment details based on the provided assignment ID.
   */
  ngOnInit(): void {
    this.assignmentId = this.route.snapshot.paramMap.get('id');
    this.getAssignmentDetails();
  }

  /**
   * Retrieves the assignment details from the server.
   * Sets the isLoading flag while fetching the details.
   * Handles success and error cases.
   */
  private getAssignmentDetails(): void {
    // Fetch assignment details from the assignment service
    this.assignmentService.getAssignmentDetails(
      this.assignmentId,
      this.languageService.currentLang ? this.languageService.currentLang : this.languageService.getBrowserCultureLang()
    ).subscribe(
      result => {
        this.assignmentDetails = result;
      },
      error => {
        console.error(error);
      }
    );
  }
}
