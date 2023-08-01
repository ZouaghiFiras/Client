// // Angular
// import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// // import { JwtHelperService } from '@auth0/angular-jwt';
// import * as _ from 'underscore';
// import { environment } from 'src/environments/environment';
// // import { AuthService, AuthenticationService, User, AyncLocalStorageHelper, Extensions } from '../..';
//
//
// @Component({
//   selector: '',
//   template: ''
// })
// export class SignInComponent implements OnInit {
//   private jwtHelper: JwtHelperService = new JwtHelperService();
//
//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private authService: AuthService,
//     private authenticationService: AuthenticationService,
//   ) { }
//
//   ngOnInit() {
//     const token = this.route.snapshot.queryParams.token;
//     let urlParams: any = {};
//     let sUrl = '';
//     let url: any;
//
//     if (token == null || this.jwtHelper.isTokenExpired(token)) {
//       localStorage.removeItem(environment.TokenName);
//       this.router.navigate(['/pages/login']);
//     } else {
//       const dashboardUrl = '/dashboard';
//       const returnUrl: string = localStorage.getItem(environment.ReturnUrlName);
//
//       localStorage.removeItem(environment.ReturnUrlName);
//
//       if (returnUrl && returnUrl.indexOf('?') > 0) {
//         url = returnUrl.split('?');
//
//         let entry = '';
//         entry = url[0];
//         urlParams = JSON.parse('{"' + decodeURI(url[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
//
//         sUrl = returnUrl ? entry : dashboardUrl;
//       } else {
//         sUrl = returnUrl ? returnUrl : dashboardUrl;
//       }
//
//       const decodedToken = this.jwtHelper.decodeToken(token);
//       const userProfile: User = _.pick(decodedToken, 'tid', 'name', 'given_name', 'family_name', 'unique_name', 'ipaddr');
//       userProfile.token = token;
//       userProfile.entrysystem = decodedToken.EntrySystem ? decodedToken.EntrySystem : null;
//       this.authenticationService.getEmployeeAuthorizations(token).subscribe(roles => {
//         if (Extensions.isEmpty(roles.settings)) {
//           this.router.navigate(['pages/403']);
//         } else {
//           AyncLocalStorageHelper.setItem(environment.TokenName, userProfile).then(() => {
//             this.authService.setAuthenticationProvider(decodedToken.EntrySystem ? decodedToken.EntrySystem : null);
//             this.router.navigate([sUrl], { queryParams: urlParams });
//           });
//         }
//       });
//
//     }
//   }
// }
