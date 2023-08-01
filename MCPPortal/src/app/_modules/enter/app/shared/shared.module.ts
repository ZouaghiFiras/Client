import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WizardStepComponent} from './wizard-step/wizard-step.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SummaryComponent} from './summary/summary.component';


@NgModule({
  declarations: [WizardStepComponent, SummaryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [WizardStepComponent]
})
export class SharedModule { }
