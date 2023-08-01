import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ReporterSelectionComponent} from './reporter-selection.component';
import {HttpClientModule} from '@angular/common/http';
import {StepperModule} from '@progress/kendo-angular-layout';

@NgModule({
  declarations: [ReporterSelectionComponent],
    imports: [
        CommonModule,
        SharedModule,
        HttpClientModule,
        RouterModule.forChild([{path: '', component: ReporterSelectionComponent}]),
        ReactiveFormsModule,
        StepperModule
    ],
  providers: [
  ]
})
export class ReporterSelectionModule {}
