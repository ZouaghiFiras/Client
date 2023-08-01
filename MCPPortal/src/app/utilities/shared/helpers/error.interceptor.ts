/**
 * Angular
 */
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

/**
 * Injectable
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  /**
   * the constructor
   */
  constructor(
    private router: Router,
    private translateService: TranslateService
  ) {
  }

  /**
   * the interceptor
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.router.navigate(['pages/401']);
        // auto logout if 401 response returned from api
        // this.authenticationService.logout();
        // location.reload(true);
      }
      if (err.status === 403) {
        this.router.navigate(['pages/403']);
      }
      if (err.status === 500) {
        return throwError({message: this.translateService.instant('Internal Server Error'), params: null});
      }
      if (err.error && (err.error.exceptionMessage || err.error.message || err.error.Message || err.error.errorCode)) {
        const error = err.error.exceptionMessage || err.error.message || err.error.Message;
        const params = err.error.Data ? err.error.Data : err.error.data;
        const errorCode = err.error.errorCode ? err.error.errorCode : null;
        const code = err.error.code ? err.error.code : null;
        return throwError({message: error, params, errorCode, code});
      }


      /**
       * return the error if exist
       */
      return throwError(err.statusText);
    }));
  }
}
