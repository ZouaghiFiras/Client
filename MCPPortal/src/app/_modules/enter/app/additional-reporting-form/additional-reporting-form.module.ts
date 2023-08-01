import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdditionalReportingFormComponent} from './additional-reporting-form.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {StepperModule} from "@progress/kendo-angular-layout";

@NgModule({
  declarations: [AdditionalReportingFormComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([{path: '', component: AdditionalReportingFormComponent}]),
        SharedModule,
        StepperModule
    ]
})
export class AdditionalReportingFormModule {}
