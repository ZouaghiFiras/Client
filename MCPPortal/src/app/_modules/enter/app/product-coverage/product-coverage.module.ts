import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCoverageComponent} from './product-coverage.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {StepperModule} from '@progress/kendo-angular-layout';

@NgModule({
  declarations: [ProductCoverageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: ProductCoverageComponent}]),
    SharedModule,
    StepperModule
  ]
})
export class ProductCoverageModule {}

