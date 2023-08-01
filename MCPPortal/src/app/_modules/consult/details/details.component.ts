import {Component, OnInit} from '@angular/core';
import {StepperStep} from '@progress/kendo-angular-layout';
import {AssignmentDetails, Attachment, Status} from '../../../_models';
import {ActivatedRoute, Router} from '@angular/router';
import {AssignmentService, AttachmentService} from '../../../_services';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';

/**
 * Component responsible for displaying assignment details.
 */
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public assignmentId: string;
  public assignmentDetails: AssignmentDetails;
  public currentStatusIndex: number;
  public partyInitials: Array<{
    avatar: string;
    name: string;
    position: string;
    address: string;
  }> = [];
  public dataPhoto: Attachment;
  public dataFiles: Attachment;
  private statuses: StepperStep[] = [
    {label: Status.New, disabled: true, icon: 'clipboard'},
    {label: Status.ToPlan, disabled: true, icon: 'clipboard-text'},
    {label: Status.Planned, disabled: true, icon: 'calendar'},
    {label: Status.Handling, disabled: true, icon: 'track-changes-accept-all'},
    {label: Status.Closed, disabled: true, icon: 'validation-data'},
    {label: Status.Cancelled, disabled: true, icon: 'trash'},
  ];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private assignmentService: AssignmentService,
    private attachmentService: AttachmentService,
    private languageService: TranslateService
  ) {
  }

  /**
   * Initializes the component and retrieves the assignment details.
   */
  ngOnInit(): void {
    this.assignmentId = this.route.snapshot.paramMap.get('id');
    this.getAssignmentDetails()
      .subscribe(
        (result) => {
          this.assignmentDetails = result;
          // Rest of the code that depends on assignmentDetails

          // Move the code that relies on assignmentDetails inside this block
          this.assignmentDetails.parties.forEach((party) => {
            // Generate initials from the party name
            const nameWords = party.partyName.split(' ');
            const initials = nameWords.map((word) => word.charAt(0).toUpperCase()).join('');
            this.partyInitials.push({
              avatar: initials,
              name: party.partyName,
              position: party.partyType,
              address: party.partyAddress,
            });
          });
          this.currentStatusIndex = this.statuses.findIndex((step) => step.label === this.assignmentDetails.status);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  /**
   * Retrieves the assignment details from the server.
   */
  private getAssignmentDetails(): Observable<AssignmentDetails> {
    return new Observable((observer) => {
      this.assignmentService.getAssignmentDetails(
        this.assignmentId,
        this.languageService.currentLang || this.languageService.getBrowserCultureLang()
      )
        .subscribe(
          (result) => {
            observer.next(result);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
    });
  }
}
