import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DamageMainReasonComponent} from './damage-main-reason.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {StepperModule} from '@progress/kendo-angular-layout';

@NgModule({
  declarations: [DamageMainReasonComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([{path: '', component: DamageMainReasonComponent}]),
        SharedModule,
        StepperModule
    ]
})
export class DamageMainReasonModule {}
