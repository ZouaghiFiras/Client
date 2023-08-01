import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowserUtils} from '@azure/msal-browser';
import {MsalGuard, MsalRedirectComponent} from '@azure/msal-angular';
import {HomeComponent, ProfileDetailsComponent} from './_components';

// Lazy-loaded modules
const enterModule = () => import('./_modules/enter/enter.module').then(x => x.EnterModule);
const consultModule = () => import('./_modules/consult/consult.module').then(x => x.ConsultModule);
const supportModule = () => import('./_modules/angular-bot/angular-bot.module').then(x => x.AngularBotModule);

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [MsalGuard]},
  {path: 'profile', component: ProfileDetailsComponent, canActivate: [MsalGuard]},
  {path: 'enter', loadChildren: enterModule, canActivate: [MsalGuard]},
  {path: 'consult', loadChildren: consultModule, canActivate: [MsalGuard]},
  {path: 'support', loadChildren: supportModule, canActivate: [MsalGuard]},
  {path: 'auth', component: MsalRedirectComponent}, // Needed for handling redirect after login
  {path: '**', redirectTo: ''} // otherwise redirect to home
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: BrowserUtils.isInIframe() || BrowserUtils.isInPopup() ? 'disabled' : 'enabled'
    })
  ]
})
export class AppRoutingModule {
}
