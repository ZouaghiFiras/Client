// /**
//  * Angular
//  */
// import { Injectable } from '@angular/core';
// // import { JwtHelperService } from '@auth0/angular-jwt';
// import { NotificationBarService } from 'ngx-notification-bar';
// import { environment } from 'src/environments/environment';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   public notificationBarService: NotificationBarService;
//   /**
//    * For getting the token in the authentification
//    */
//   private jwtHelper: JwtHelperService = new JwtHelperService();
//   private token: string;
//   private authenticationProvider: string;
//   /**
//    * constructor
//    */
//   constructor(
//   ) {
//     const currentToken = localStorage.getItem(environment.TokenName);
//     const authenticationProvider = localStorage.getItem(environment.AuthenticationProvider);
//
//     this.token = (currentToken == null) ? null : JSON.parse(currentToken).token;
//     this.authenticationProvider = (authenticationProvider == null) ? null : authenticationProvider;
//   }
//   /**
//    * To logout when we click on the logout button
//    */
//   public logout(): void {
//     console.log('>>> AuthService: logout()');
//     /**
//      * Removing the token when we logout
//      */
//     this.token = null;
//     localStorage.removeItem(environment.TokenName);
//   }
//   /**
//    * For getting the token when we login
//    */
//   public getToken(): any {
//     console.log('>>> AuthService: getToken()');
//
//     if (!this.token || this.jwtHelper.isTokenExpired(this.token)) {
//       const currentToken = localStorage.getItem(environment.TokenName);
//
//       this.token = (currentToken == null) ? null : JSON.parse(currentToken).token;
//     }
//
//     return this.token;
//   }
//   /**
//    * To get the Authentication provider
//    */
//   public getAuthenticationProvider(): any {
//     console.log('>>> AuthService: getAuthenticationProvider()');
//
//     if (!this.authenticationProvider) {
//       const authenticationProvider = localStorage.getItem(environment.AuthenticationProvider);
//
//       this.authenticationProvider = authenticationProvider;
//     }
//
//     return this.authenticationProvider;
//   }
//   /**
//    * This methode : setAuthenticationProvider() To set the authentication provider
//    */
//   public setAuthenticationProvider(authenticationProvider: string): any {
//     console.log('>>> AuthService: setAuthenticationProvider()');
//
//     localStorage.setItem(environment.AuthenticationProvider, authenticationProvider);
//   }
//   /**
//    *  This methode : isUserLoggedIn() To verify if the user is LoggedIn() or not
//    */
//   public isUserLoggedIn(): boolean {
//     console.log('>>> AuthService: isUserLoggedIn()');
//
//     return this.token == null ? false : !this.jwtHelper.isTokenExpired(this.token);
//   }
// }
