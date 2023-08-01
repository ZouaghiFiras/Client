/**
 * Angular
 */
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
  /**
   * the constructor
   */
  constructor(private authenticationService: AuthenticationService) {
  }

  /**
   * the interceptor
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    const isRoleUrl = request.url === environment.ServiceAuthURL + 'employeeauthorizations';
    if (isLoggedIn && !isRoleUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache'
          // 'Content-Type': 'application/json'
        }
      });
    }
    return next.handle(request);
  }
}
