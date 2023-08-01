import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';

import {StepperModule} from '@progress/kendo-angular-layout';
import {ReporterInformationComponent} from './reporter-information.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [ReporterInformationComponent],
    imports: [
        CommonModule,
        SharedModule,
        HttpClientModule,
        RouterModule.forChild([{path: '', component: ReporterInformationComponent}]),
        ReactiveFormsModule,
        StepperModule
    ]
})
export class ReporterInformationModule {}
