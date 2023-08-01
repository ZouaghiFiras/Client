import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DamageSubReasonComponent} from './damage-sub-reason.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {StepperModule} from '@progress/kendo-angular-layout';

@NgModule({
  declarations: [DamageSubReasonComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([{path: '', component: DamageSubReasonComponent}]),
        SharedModule,
        StepperModule
    ]
})
export class DamageSubReasonModule {}
