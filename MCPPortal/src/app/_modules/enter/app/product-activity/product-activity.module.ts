import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ProductActivityComponent} from './product-activity.component';
import {StepperModule} from '@progress/kendo-angular-layout';

@NgModule({
  declarations: [ProductActivityComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: ProductActivityComponent}]),
    SharedModule,
    StepperModule
  ]
})
export class ProductActivityModule {}

