// Angular
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// Components
import {PagesRoutingModule} from './pages-routing.module';
import {P401Component} from './components/401/401.component';
import {P403Component} from './components/403/403.component';
import {P404Component} from './components/404/404.component';
import {LoginComponent} from './components/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  declarations: [
    P401Component,
    P403Component,
    P404Component,
    LoginComponent,
  ]
})
export class PagesModule {
}
