// // Angular
// import { Injectable } from '@angular/core';
// import { Router, CanActivate } from '@angular/router';
// import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// // import { JwtHelperService } from '@auth0/angular-jwt';
// import { environment } from 'src/environments/environment';
// import { WindowRef } from '../../layout';
// import { AuthenticationService } from '../services/authentification.service';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   private jwtHelper: JwtHelperService = new JwtHelperService();
//
//   constructor(
//     private router: Router,
//     private window: WindowRef,
//     private authenticationService: AuthenticationService) {
//   }
//
//   public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const currentUser = this.authenticationService.currentUserValue;
//
//     const urlToken = route.queryParams ? route.queryParams.token : undefined;
//     const authenticationProvider = route.queryParams ? route.queryParams.authenticationProvider : undefined;
//     const userProfile = localStorage.getItem(environment.TokenName);
//     const token = (userProfile == null) ? null : JSON.parse(userProfile).token;
//
//     if (urlToken && !this.jwtHelper.isTokenExpired(urlToken)) {
//       return true;
//     } else if (currentUser && !this.jwtHelper.isTokenExpired(currentUser.token)) {
//       return true;
//     } else if (token != null && !this.jwtHelper.isTokenExpired(token)) {
//       return true;
//     } else if (token == null || this.jwtHelper.isTokenExpired(token) || userProfile == null) {
//       this.router.navigate(['/pages/login']);
//       return false;
//     } else {
//       localStorage.removeItem(environment.TokenName);
//       localStorage.setItem(environment.ReturnUrlName, state.url);
//
//       if (authenticationProvider && authenticationProvider === '1') {
//         const location = this.window.nativeWindow.location;
//         const returnUrl = encodeURIComponent(`https://${location.host}/#/login`);
//
//         localStorage.setItem(environment.AuthenticationProvider, authenticationProvider);
//
//         setTimeout(() => {
//           window.location.href = environment.LoginURL + returnUrl;
//         }, 200);
//       } else {
//         this.router.navigate(['/pages/login'], { queryParams: { returnUrl: state.url } });
//       }
//
//       return false;
//     }
//   }
// }
