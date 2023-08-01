import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PartiesComponent} from './parties.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [PartiesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: PartiesComponent }]),
    SharedModule
  ]
})
export class PartiesModule {}
