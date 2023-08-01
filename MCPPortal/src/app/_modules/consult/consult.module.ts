import {StatusComponent} from './details/status/status.component';
import {ConsultRoutingModule} from './consult-routing.module';
import {PolicyComponent} from './details/policy/policy.component';
import {EmptyResultsComponent} from './consult/search-results/empty-results/empty-results.component';
import {AddDocumentComponent} from './documents/document-previewer/empty-documents/add-document/add-document.component';
import {DamageComponent} from './details/damage/damage.component';
import {CommonModule} from '@angular/common';
import {SearchSectionComponent} from '../../_components';
import {ExcelModule, PDFModule} from '@progress/kendo-angular-grid';
import {NgModule} from '@angular/core';
import {DetailsComponent} from './details/details.component';
import {EmptyDocumentsComponent} from './documents/document-previewer/empty-documents/empty-documents.component';
import {ContactComponent} from './details/contact/contact.component';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {ConsultComponent} from './consult/consult.component';
import {VisitorInfoComponent} from './details/visitor-info/visitor-info.component';
import {PartyComponent} from './details/party/party.component';
import {SharedModule} from '../../utilities/shared/shared.module';
import {AddAttachmentComponent} from './details/add-attachment/add-attachment.component';
import {SearchResultsComponent} from './consult/search-results/search-results.component';
import {DocumentPreviewerComponent} from './documents/document-previewer/document-previewer.component';
import {ButtonModule} from '@progress/kendo-angular-buttons';
import {UploadModule} from '@progress/kendo-angular-upload';
import {DocumentsComponent} from './documents/documents.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    ConsultComponent,
    DetailsComponent,
    DocumentsComponent,
    SearchSectionComponent,
    SearchResultsComponent,
    EmptyResultsComponent,
    AddAttachmentComponent,
    EmptyDocumentsComponent,
    AddDocumentComponent,
    VisitorInfoComponent,
    StatusComponent,
    DamageComponent,
    PartyComponent,
    PolicyComponent,
    ContactComponent,
    DocumentPreviewerComponent,
  ],
    exports: [
        SearchSectionComponent,
        AddAttachmentComponent,
    ],
  imports: [
    TranslateModule,
    CommonModule,
    ConsultRoutingModule,
    SharedModule,
    PDFModule,
    ExcelModule,
    NgxExtendedPdfViewerModule,
    SharedModule,
    UploadModule,
    ButtonModule,

  ],
})
export class ConsultModule {
}
