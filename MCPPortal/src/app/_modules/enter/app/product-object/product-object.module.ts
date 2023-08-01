import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductObjectComponent} from './product-object.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {StepperModule} from '@progress/kendo-angular-layout';

@NgModule({
  declarations: [ProductObjectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: ProductObjectComponent}]),
    SharedModule,
    StepperModule
  ]
})
export class ProductObjectModule {}

