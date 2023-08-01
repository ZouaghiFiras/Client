import {Component, OnInit} from '@angular/core';
import {FileInfo, FileRestrictions, RemoveEvent, SelectEvent, SuccessEvent} from '@progress/kendo-angular-upload';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ProspectApiService, SharePointService} from '../../../../../../_services';
import {SPDocument} from '../../../../../../_models/spdocument';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
})
export class AddDocumentComponent implements OnInit {
  assignmentNumber = '';
  uploadSaveUrl = `https://dossierapiprospect-t.azurewebsites.net/Document/Dossier/`;
  uploadRemoveUrl = this.uploadSaveUrl;
  public myFiles: FileInfo[] = [];
  public myRestrictions: FileRestrictions = {
    allowedExtensions: ['.pdf', '.jpg', '.txt', '.mov', '.mp4', '.avi', '.jpeg', '.bmp', '.gif', '.png', '.xml', '.jfif'],
  };
  dialogVisible = false;
  types: any[];
  selectedType: any;
  private token: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private sharepointService: SharePointService,
    private prospectApiService: ProspectApiService
  ) {}


  /**
   * Lifecycle hook that gets called after component initialization.
   * Initializes assignment number, URLs, and retrieves attachment types.
   */
  ngOnInit(): void {
    this.assignmentNumber = this.route.snapshot.paramMap.get('id');
    this.uploadSaveUrl += `${this.assignmentNumber}/Upload`;
    console.log(this.uploadSaveUrl);
    this.uploadRemoveUrl += `${this.assignmentNumber}/Delete`;
    this.prospectApiService.getDocumentTypes().subscribe(next => {
      this.types = next;
      console.log(this.types);
    });
    this.sharepointService.getProspectToken().subscribe(token => {
      this.token = token;
    });
  }

  openDialog(): void {
    this.dialogVisible = true;
  }

  closeDialog(): void {
    this.dialogVisible = false;
  }

  submitAttachments(): void {
    const uploadPromises = this.myFiles.map(file => {
      const document: Partial<SPDocument> = {
        name: file.name,
        type: this.selectedType,
        displayName: file.name,
        extension: file.extension,
        content: null,
      };

      return this.encodeFileToBase64(file)
        .then(base64String => {
          document.content = base64String;
          return this.sharepointService.determineDocumentSize(document);
        })
        .then(size => {
          document.size = size;
          const headers = this.getHeaders();
          return this.http.put<any>(`${this.uploadSaveUrl}/${file.name}`, document, { headers }).toPromise();
        })
        .then(res => {
          if (res && res.success) { // Check the response status or property indicating success
            console.log(document);
            console.log(res);
            console.log(`The file ${file.name} is uploaded successfully!`);
          } else {
            throw new Error(`Failed to upload file: ${file.name}`);
          }
        })
        .catch(err => {
          console.error(err);
          console.error(`There is an issue, the file ${file.name} was not uploaded!`);
          throw err; // Propagate the error to the Promise.all catch block
        });
    });

    Promise.all(uploadPromises)
      .then(() => {
        // All files uploaded successfully
        console.log('All files uploaded successfully!');
      })
      .catch(error => {
        console.error(error);
        // Handle error when any file upload fails
      });
  }


  getHeaders(): HttpHeaders {
    console.log(this.token);
    return new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.token}`);
  }

  goToDocuments(): void {
    this.router.navigateByUrl(`/consult/${this.assignmentNumber}/documents`).then();
  }

  onUpload(ev: SuccessEvent): void {
    // if (ev.files) {
    //   ev.files.forEach(file => {
    //     if (file.rawFile && !file.validationErrors && ev.operation === 'upload') {
    //       this.myFiles.push(file);
    //     }
    //   });
    // }


    // Handle the success event here
    // You can perform any custom logic or display a success message
    console.log('File uploaded successfully!');
  }

  onRemove(ev: RemoveEvent): void {
    ev.files.forEach(file => {
      this.myFiles = this.myFiles.filter(f => f.uid !== file.uid);
    });
  }

  encodeFileToBase64(file: FileInfo): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result); // Add this line to log the result
        const base64String = btoa(reader.result as string);
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsBinaryString(file.rawFile);
    });
  }

  uploadEventHandler(event: SelectEvent): void {
    this.myFiles = event.files;
    // Perform any customization or validation logic here before the upload

    // Start the upload process
    this.uploadFiles();
    this.closeDialog();
  }

  uploadFiles(): void {
    const uploadPromises = this.myFiles.map(file =>
      this.encodeFileToBase64(file).then(content => ({
        name: file.name,
        type: this.selectedType,
        displayName: file.name,
        extension: file.extension,
        content,
        size: null,
      }))
    );

    Promise.all(uploadPromises)
      .then(documents =>
        Promise.all(
          documents.map(document => {
            document.size = this.sharepointService.determineDocumentSize(document);
            return document;
          })
        )
      )
      .then(documentsWithSize => {
        const headers = this.getHeaders();
        console.log(documentsWithSize);
        return this.http.put<any>(this.uploadSaveUrl, documentsWithSize, { headers }).toPromise();
      })
      .then(res => {
        console.log(res);
        alert('The file is uploaded successfully!');
      })
      .catch(error => {
        console.error(error);
        alert('There is an issue, the file was not uploaded!');
      });
  }
}
