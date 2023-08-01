import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AttachmentService} from '../../_services';

@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
})
export class DocumentPreviewComponent implements OnInit {
  public dialogOpened = false;
  public data: string[] = [];
  private assignmentId: string;

  constructor(
    private route: ActivatedRoute,
    private attachmentService: AttachmentService
  ) {
  }

  /**
   * Initializes the component and retrieves the document attachments for the assignment.
   */
  ngOnInit(): void {
    this.assignmentId = this.route.snapshot.paramMap.get('id');
    this.retrieveDocumentAttachments();
  }

  /**
   * Closes the specified dialog component.
   * @param component The name of the dialog component to close.
   */
  public close(component: string): void {
    this[component + 'Opened'] = false;
  }

  /**
   * Opens the specified dialog component.
   * @param component The name of the dialog component to open.
   */
  public open(component: string): void {
    this[component + 'Opened'] = true;
  }

  /**
   * Performs an action based on the dialog result.
   * @param status The result of the dialog action.
   */
  public action(status: string): void {
    console.log(`Dialog result: ${status}`);
    this.dialogOpened = false;
  }

  /**
   * Retrieves the document attachments for the assignment from the server.
   */
  private retrieveDocumentAttachments(): void {
    this.attachmentService.getPhotos(this.assignmentId)
      .subscribe(
        (files: string[]) => {
          this.data = files;
          console.log(this.data);
        },
        (error: any) => {
          console.error('Failed to retrieve document attachments:', error);
          // TODO: Handle error, display an error message, or perform any other necessary action
        }
      );
  }
}
