import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdditionalActivitiesComponent} from './additional-activities.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {StepperModule} from "@progress/kendo-angular-layout";

@NgModule({
  declarations: [AdditionalActivitiesComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([{path: '', component: AdditionalActivitiesComponent}]),
        SharedModule,
        StepperModule
    ]
})
export class AdditionalActivitiesModule {}
