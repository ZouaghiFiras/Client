import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ObjectComponent} from './object.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ObjectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ObjectComponent }]),
    SharedModule
  ]
})
export class ObjectModule {}
