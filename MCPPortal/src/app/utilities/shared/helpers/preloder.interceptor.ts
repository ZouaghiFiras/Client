/**
 * Angular
 */
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {PreloaderService} from '../services/preloader.service';
import {SharedService} from '../services/shared.service';

@Injectable({
  providedIn: 'root',
})

export class PreloaderInterceptor implements HttpInterceptor {
  serviceCount = 0; // counter globally initialized.
  constructor(
    private preloaderService: PreloaderService,
    private sharedService: SharedService
  ) {
  }

  /**
   * the interceptor
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.serviceCount++; // increament count for each intercepted http request
    if (this.serviceCount === 1) {
      this.preloaderService.showPreloader(); // show preloader
      this.sharedService.emitChange({action: 'progressBar', value: {action: 'start'}});
    }
    return next.handle(request).pipe(finalize(() => {
      this.serviceCount--;
      // decrement when service is completed (success/failed both
      // handled when finalize rxjs operator used)
      if (this.serviceCount === 0) {
        this.preloaderService.hidePreloader(); // hide preloader
        this.sharedService.emitChange({action: 'progressBar', value: {action: 'stop'}});
      }
    }));
  }
}
