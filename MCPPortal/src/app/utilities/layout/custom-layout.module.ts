// Angular
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderMenuComponent} from './components/headermenu/headermenu.component';
import {NavMenuComponent} from './components/navmenu/navmenu.component';
import {SimpleLayoutComponent} from './components/simple-layout/simple-layout.component';
import {SharedModule} from '../shared/shared.module';
import {ThemeModule} from '../theme/theme.module';
import {BreadCrumbComponent} from './components/bread-crumb/bread-crumb.component';
import {FullLayoutComponent} from './components/full-layout/full-layout.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ThemeModule
  ],
  declarations: [
    FullLayoutComponent,
    HeaderMenuComponent,
    NavMenuComponent,
    SimpleLayoutComponent,
    BreadCrumbComponent
  ],

  exports: [
    FullLayoutComponent,
    HeaderMenuComponent,
    NavMenuComponent,
    SimpleLayoutComponent,
    BreadCrumbComponent
  ]
})
export class CustomLayoutModule {
}
