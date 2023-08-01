// Angular
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// import { AuthGuard } from '../shared';
import {ProfileComponent} from './components/profile/profile.component';
import {SettingsComponent} from './components/settings/settings.component';
import {DashboardComponent} from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    component: DashboardComponent,
    data: {
      title: 'Dashboard',
      breadcrumbs: 'Dashboard'
    }
  },
  {
    path: 'settings',
    // canActivate: [AuthGuard],
    component: SettingsComponent,
    data: {
      title: 'Settings',
      breadcrumbs: 'Settings'
    }
  },
  {
    path: 'profile',
    // canActivate: [AuthGuard],
    component: ProfileComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
