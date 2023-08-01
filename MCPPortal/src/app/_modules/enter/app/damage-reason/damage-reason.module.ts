import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DamageReasonComponent} from './damage-reason.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {StepperModule} from '@progress/kendo-angular-layout';

@NgModule({
  declarations: [DamageReasonComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([{path: '', component: DamageReasonComponent}]),
        SharedModule,
        StepperModule
    ]
})
export class DamageReasonModule {}
