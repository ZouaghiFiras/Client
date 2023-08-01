import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ProfileComponent} from './components/profile/profile.component';
import {SettingsComponent} from './components/settings/settings.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {FilterPipe} from './services/filter.pipe';
import {MenuStepperComponent} from './components/menu-stepper/menu-stepper.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
    FilterPipe,
    SettingsComponent,
    MenuStepperComponent
  ],
  exports: [
    MenuStepperComponent
  ]
})
export class DashboardModule {
}
