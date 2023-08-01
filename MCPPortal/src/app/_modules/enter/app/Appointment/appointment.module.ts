import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AppointmentComponent} from './appointment.component';

@NgModule({
  declarations: [AppointmentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: AppointmentComponent }]),
    SharedModule
  ]
})
export class AppointmentModule {}

