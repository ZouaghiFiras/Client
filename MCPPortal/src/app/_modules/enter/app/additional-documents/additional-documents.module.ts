import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdditionalDocumentsComponent} from './additional-documents.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {StepperModule} from "@progress/kendo-angular-layout";

@NgModule({
  declarations: [AdditionalDocumentsComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([{path: '', component: AdditionalDocumentsComponent}]),
        SharedModule,
        StepperModule
    ]
})
export class AdditionalDocumentsModule {}
