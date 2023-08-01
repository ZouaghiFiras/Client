import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ConsultComponent} from './consult/consult.component';
import {DocumentsComponent} from './documents/documents.component';
import {DetailsComponent} from './details/details.component';

const routes: Routes = [
  {path: '', component: ConsultComponent}, // Route for the consult component
  {path: ':id', component: DetailsComponent}, // Route for the details component with parameter 'id'
  {path: ':id/documents', component: DocumentsComponent}, // Route for the documents component with parameter 'id'
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // Configure the routes for the module
  ],
  exports: [RouterModule], // Export the configured routes
})
export class ConsultRoutingModule {
}
