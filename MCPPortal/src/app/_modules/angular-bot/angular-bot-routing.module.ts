import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AngularBotComponent} from './angular-bot/angular-bot.component';


const routes: Routes = [
  {
    path: '',
    component: AngularBotComponent,
    children: []
  }
];

/**
 * The routing module for the Enter feature module.
 * Handles the routing configuration for EnterComponent and its child routes.
 */
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AngularBotRoutingModule {
}
