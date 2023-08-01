import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {WindowRef} from '../../../layout';
// import { AuthProvider, AuthService } from 'src/app/modules/shared';
import * as _ from 'underscore';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  // public authProviders: AuthProvider[] = [];
  public isClicked = false;
  public logoEntrySystem: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    // private authService: AuthService,
    private window: WindowRef
  ) {

    console.log('LoginComponent: constructor');
    const params = this.route.snapshot.queryParams;
    if (!_.isEmpty(params)) {
      if (params.provider === 'Azure') {
        this.ChangeRoute(environment.LoginURL);
      }
    }
    // if (this.authService.isUserLoggedIn() && _.isEmpty(params)) {
    //   this.router.navigate(['dashboard']);
    // }
  }

  public ChangeRoute(routeValue): void {
    console.log('> LoginComponent: changeRoute: ' + routeValue);
    this.isClicked = true;
    setTimeout(() => {
      window.location.href = routeValue;
    }, 200);
  }


  public ngOnInit() {
    console.log('LoginComponent: ngOnInit');
    const location = this.window.nativeWindow.location;
    const returnUrl = '&returnUrl=' + encodeURIComponent(`https://${location.host}/#/login`);
    this.logoEntrySystem = environment.EntrySystem;
    // this.authProviders.push({
    //   Name: 'Prospect',
    //   Url: environment.LoginURL + returnUrl
    // });
    // this.authProviders.push({
    //   Name: 'Prospect Property',
    //   Url: environment.LoginURL + 27 + returnUrl
    // });
    //
    // this.authProviders.push({
    //   Name: 'Prospect Mobility',
    //   Url: environment.LoginURL + 28 + returnUrl
    // });
  }
}
