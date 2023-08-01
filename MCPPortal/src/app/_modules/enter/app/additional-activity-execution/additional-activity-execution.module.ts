import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdditionalActivityExecutionComponent} from './additional-activity-execution.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {StepperModule} from "@progress/kendo-angular-layout";

@NgModule({
  declarations: [AdditionalActivityExecutionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: AdditionalActivityExecutionComponent}]),
    SharedModule,
    StepperModule
  ]
})
export class AdditionalActivityExecutionModule {}
