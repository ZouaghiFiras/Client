import {Component, Input, OnInit} from '@angular/core';
import {Attachment} from '../../_models';
import {AttachmentService} from '../../_services';

@Component({
  selector: 'app-attachment-list',
  templateUrl: './attachement-list.component.html',
})
export class AttachmentListComponent implements OnInit {
  @Input() dataPhoto: Attachment;
  @Input() dataFiles: Attachment;
  @Input() assignmentNumber: string;
  public dialog1Opened = false;
  public dialog2Opened = false;

  constructor(private attachmentService: AttachmentService) {
  }

  ngOnInit(): void {
  }

  /**
   * Closes the specified dialog component.
   * @param component The name of the dialog component.
   */
  public close(component: string): void {
    this[component + 'Opened'] = false;
  }

  /**
   * Opens the specified dialog component.
   * @param component The name of the dialog component.
   */
  public open(component: string): void {
    this[component + 'Opened'] = true;
  }

  /**
   * Downloads the photos associated with the assignment.
   */
  downloadPhotos(): void {
    // TODO: Implement the downloadPhotos method
    // this.attachmentService.downloadFiles('photo', this.assignmentNumber).subscribe(next => {
    //   console.log(next);
    // });
  }

  /**
   * Downloads the specified photo item.
   * @param photo The photo item to download.
   */
  downloadItem(photo: string): void {
    // TODO: Implement the downloadItem method
    // this.attachmentService.downloadFile(photo).subscribe(next => {
    //   console.log(next);
    // });
  }

  /**
   * Downloads the documents associated with the assignment.
   */
  downloadDocuments(): void {
    // TODO: Implement the downloadDocuments method
    // this.attachmentService.downloadFiles('preview', this.assignmentNumber).subscribe(next => {
    //   console.log(next);
    // });
  }
}
