import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PartyComponent} from './party.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [PartyComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: PartyComponent }]),
    SharedModule
  ]
})
export class PartyModule {}
