import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductSubObjectComponent} from './product-sub-object.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {StepperModule} from '@progress/kendo-angular-layout';

@NgModule({
  declarations: [ProductSubObjectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: ProductSubObjectComponent}]),
    SharedModule,
    StepperModule
  ]
})
export class ProductSubObjectModule {}

