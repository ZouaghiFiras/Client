import {Component, OnInit} from '@angular/core';
import {FileInfo, FileRestrictions, RemoveEvent, SuccessEvent} from '@progress/kendo-angular-upload';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AttachmentService} from '../../_services';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
})
export class AddPhotoComponent implements OnInit {
  assignmentNumber = '';
  uploadSaveUrl = `https://localhost:7023/File/upload`;
  uploadRemoveUrl = `https://localhost:7023/File/delete`;
  public myFiles: FileInfo[] = [];
  public myRestrictions: FileRestrictions = {
    allowedExtensions: ['.jpg', '.jpeg', '.bmp', '.gif', '.png', '.jfif'],
  };
  dialogVisible = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private attachmentService: AttachmentService
  ) {
  }

  /**
   * Initializes the component.
   * Retrieves the assignment number from the route parameters.
   * Sets the upload URLs based on the assignment number.
   */
  ngOnInit(): void {
    this.assignmentNumber = this.route.snapshot.paramMap.get('id');
    this.uploadSaveUrl += `&${this.assignmentNumber}`;
    this.uploadRemoveUrl += `&${this.assignmentNumber}`;
  }

  /**
   * Opens the dialog.
   */
  openDialog(): void {
    this.dialogVisible = true;
  }

  /**
   * Closes the dialog.
   */
  closeDialog(): void {
    this.dialogVisible = false;
  }

  /**
   * Submits the attachments.
   * Sends a POST request to upload the documents using the uploadSaveUrl.
   * Handles success and error cases.
   */
  submitAttachments(): void {
    try {
      const formData = new FormData();
      this.myFiles.forEach(file => {
        formData.append('files', file.rawFile, file.name);
      });

      this.http.post(`${this.uploadSaveUrl}`, formData).subscribe(
        res => {
          console.log(res);
          alert('The file is uploaded successfully!');
        },
        err => {
          console.error(err);
          alert('There is an issue, the file is not uploaded!');
        }
      );
    } catch (err) {
      console.error(err);
      // TODO: Show error message
    }
  }

  /**
   * Event handler for the upload success event.
   * Adds the uploaded documents to the myFiles array.
   * Skips documents with validation errors.
   * @param ev The success event.
   */
  public onUpload(ev: SuccessEvent): void {
    if (ev.files) {
      ev.files.forEach((file: FileInfo) => {
        if (file.rawFile && !file.validationErrors && ev.operation === 'upload') {
          this.myFiles.push(file);
        }
      });
    }
  }

  /**
   * Event handler for the file remove event.
   * Removes the specified documents from the myFiles array.
   * @param ev The remove event.
   */
  public onRemove(ev: RemoveEvent): void {
    ev.files.forEach((file: FileInfo) => {
      this.myFiles = this.myFiles.filter((f) => f.uid !== file.uid);
    });
  }
}
