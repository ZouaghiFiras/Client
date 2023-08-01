import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DamageAdditionalInformationComponent} from './damage-additional-information.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {StepperModule} from '@progress/kendo-angular-layout';

@NgModule({
  declarations: [DamageAdditionalInformationComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([{path: '', component: DamageAdditionalInformationComponent}]),
        SharedModule,
        StepperModule
    ]
})
export class DamageAdditionalInformationModule {}
