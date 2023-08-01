import {Component, OnInit, ViewChild} from '@angular/core';
import {ProspectApiService, SharePointService} from '../../../../_services';
import {ActivatedRoute} from '@angular/router';
import {Document} from '../../../../_models/Document';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {NgxExtendedPdfViewerComponent, NgxExtendedPdfViewerService} from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-doc-previewer',
  templateUrl: './document-previewer.component.html',
  styleUrls: ['./document-previewer.component.scss']
})
export class DocumentPreviewerComponent implements OnInit {
  @ViewChild(NgxExtendedPdfViewerComponent) pdfViewer: NgxExtendedPdfViewerComponent;
  dialogVisible = false;
  documents: Document[] = [];
  selectedDocument: Document | null = null;
  // selectedDocumentUrl: SafeResourceUrl | null = null;
  // selectedDocumentUrl: string | null = null;
  private assignmentId = '';
  gridHeight = 400; // Adjust the height as needed
  selectedFileContent: ArrayBuffer | null = null;
  SourcePdf: string;
  empty = true;
  selectedSrc: SafeResourceUrl;
  selectedDocumentUrl: SafeResourceUrl;
  constructor(
    private sharePointApiService: SharePointService,
    private prospectApiService: ProspectApiService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private pdfViewerService: NgxExtendedPdfViewerService
  ) {}

  ngOnInit() {
    this.assignmentId = this.route.snapshot.paramMap.get('id');
    this.getDocuments();
  }
token(): string{
    let token: string = null;
    this.prospectApiService.getProspectToken().subscribe(
      data => {
        token = data;
      }
    );
    return token;
}

  getDocuments() {
    this.prospectApiService.getDocuments(this.assignmentId).subscribe(
      (files: Document[]) => {
        this.documents = files;
        this.empty = !!(!this.documents.length);
      },
      (error) => {
        console.error('Error retrieving documents:', error);
      }
    );
  }

  isImageFile(selectedfile: Document): boolean {
    const extension = selectedfile.extension;
    return extension === 'png' || extension === 'jpg' || extension === 'jpeg' || extension === 'gif' || extension === 'jfif';
  }
sanitize(url: string): SafeResourceUrl {
    console.log(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
  isPdfFile(selectedfile: Document): boolean {
    const extension = selectedfile.extension;
    return extension === 'pdf';
  }
  // onCellClick(event: any) {
  //   const selectedFile = event.dataItem as Document;
  //   // this.selectedDocumentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(selectedFile.url);
  //   this.selectedDocumentUrl = selectedFile.url;
  //   console.log(this.selectedDocumentUrl);
  // }
  //
  // onCellClick(event: any) {
  //   const selectedDocument = event.dataItem as Document;
  //   this.selectedDocument = selectedDocument;
  //   const filename = 'myfile.txt';
  //   this.sharePointApiService.getFileSrc(this.assignmentId, selectedDocument.name).subscribe(
  //     (fileContent: string) => {
  //       const file = this.base64ToFile(fileContent, filename);
  //       this.SourcePdf = fileContent;
  //       this.selectedSrc = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
  //       this.readFileContent(file);
  //     },
  //     (error) => {
  //       console.error('Error retrieving file content:', error);
  //     }
  //   );
  // }
  //
  // base64ToFile(base64String: string, filename: string): File {
  //   const byteCharacters = atob(base64String);
  //   const byteNumbers = new Array(byteCharacters.length);
  //   for (let i = 0; i < byteCharacters.length; i++) {
  //     byteNumbers[i] = byteCharacters.charCodeAt(i);
  //   }
  //   const byteArray = new Uint8Array(byteNumbers);
  //   const blob = new Blob([byteArray], { type: 'application/octet-stream' });
  //   return new File([blob], filename);
  // }
  //
  // readFileContent(file: File) {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     this.selectedFileContent = reader.result as ArrayBuffer;
  //   };
  //   reader.readAsArrayBuffer(file);
  // }
  /**
   * Opens the attachment dialog.
   */
  openDialog(document: Document): void {
    this.selectedDocument = document;
    this.dialogVisible = true;
  }
  /**
   * Closes the attachment dialog.
   */
  closeDialog(): void {
    this.dialogVisible = false;
  }


  // onCellClick(event: any) {
  //   const selectedDocument = event.dataItem as Document;
  //   this.selectedDocument = selectedDocument;
  //   const filename = 'myfile.txt';
  //   this.prospectApiService.getDocument(selectedDocument.name).subscribe(
  //     (fileContent: string) => {
  //       const file = this.base64ToFile(fileContent, filename);
  //       this.SourcePdf = fileContent;
  //       this.selectedDocumentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
  //       this.readFileContent(file);
  //     },
  //     (error) => {
  //       console.error('Error retrieving file content:', error);
  //     }
  //   );
  // }

  // base64ToFile(base64String: string, filename: string): File {
  //   const byteCharacters = atob(base64String);
  //   const byteNumbers = new Array(byteCharacters.length);
  //   for (let i = 0; i < byteCharacters.length; i++) {
  //     byteNumbers[i] = byteCharacters.charCodeAt(i);
  //   }
  //   const byteArray = new Uint8Array(byteNumbers);
  //   const blob = new Blob([byteArray], { type: 'application/octet-stream' });
  //   return new File([blob], filename);
  // }

  // readFileContent(file: File) {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     this.selectedFileContent = reader.result as ArrayBuffer;
  //   };
  //   reader.readAsArrayBuffer(file);
  // }

}
