import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DamageCauseComponent} from './damage-cause.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {StepperModule} from '@progress/kendo-angular-layout';

@NgModule({
  declarations: [DamageCauseComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([{path: '', component: DamageCauseComponent}]),
        SharedModule,
        StepperModule
    ]
})
export class DamageCauseModule {}
