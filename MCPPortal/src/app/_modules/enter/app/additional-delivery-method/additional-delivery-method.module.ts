import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdditionalDeliveryMethodComponent} from './additional-delivery-method.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {StepperModule} from "@progress/kendo-angular-layout";

@NgModule({
  declarations: [AdditionalDeliveryMethodComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([{path: '', component: AdditionalDeliveryMethodComponent}]),
        SharedModule,
        StepperModule
    ]
})
export class AdditionalDeliveryMethodModule {}
