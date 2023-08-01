// Angular
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {P401Component} from './components/401/401.component';
import {P403Component} from './components/403/403.component';
import {P404Component} from './components/404/404.component';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Pages',
      breadcrumbs: ''
    },
    children: [
      {
        path: '401',
        component: P401Component,
        data: {
          title: 'Page 401',
          breadcrumbs: ''
        }
      },
      {
        path: '403',
        component: P403Component,
        data: {
          title: 'Page 403',
          breadcrumbs: ''
        }
      },
      {
        path: '404',
        component: P404Component,
        data: {
          title: 'Page 404',
          breadcrumbs: ''
        }
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login Page',
          breadcrumbs: ''
        }
      },
      {path: '**', component: P404Component}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
