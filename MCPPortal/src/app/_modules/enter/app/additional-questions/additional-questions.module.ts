import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdditionalQuestionsComponent} from './additional-questions.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {StepperModule} from "@progress/kendo-angular-layout";

@NgModule({
  declarations: [AdditionalQuestionsComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([{path: '', component: AdditionalQuestionsComponent}]),
        SharedModule,
        StepperModule
    ]
})
export class AdditionalQuestionsModule {}
