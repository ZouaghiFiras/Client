// Angular
import {ErrorHandler, Injectable} from '@angular/core';
import {SharedService} from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private sharedService: SharedService
  ) {
  }

  public handleError(error: any): void {
    // let errorMessage = '';
    //
    // if (error && error.message && error.message.indexOf('ExpressionChangedAfterItHasBeenCheckedError') > 0) {
    //   console.warn(error);
    //
    //   return;
    // }
    //
    // if (error.rejection && typeof error.rejection.json == 'function') {
    //   let myErrorObj: any = {};
    //
    //   if (error.rejection._body) {
    //     myErrorObj.message = error.rejection.text();
    //   } else {
    //     myErrorObj = error.rejection.json();
    //   }
    //
    //   if (myErrorObj.message.charAt(0) === '{') {
    //     myErrorObj = JSON.parse(myErrorObj.message);
    //   }
    //
    //   if (myErrorObj.error) {
    //     errorMessage = myErrorObj.error.message;
    //   }
    //   else if (myErrorObj.Message) {
    //     errorMessage = myErrorObj.Message;
    //   } else {
    //     errorMessage = myErrorObj.message;
    //   }
    // } else if (error.rejection && error.rejection.message) {
    //   errorMessage = error.rejection.message;
    // } else {
    //   if (error.message) {
    //     errorMessage = error.message;
    //   } else if (error.text()) {
    //     const err = JSON.parse(error.text());
    //
    //     errorMessage = err.Message;
    //   } else {
    //     errorMessage = 'Unknown error';
    //   }
    // }
    //
    // if (!errorMessage) {
    //   errorMessage = 'Please contact IT';
    // }
    //
    // if (errorMessage && errorMessage.indexOf('ExpressionChangedAfterItHasBeenCheckedError') < 0) {
    //   const env = environment.ProductType;
    //   if (env === 'TST' || env === 'QA') {
    // this.notificationBarService.create({ hideDelay: 24 * 60 * 60000, hideOnHover: false,
    //     allowClose: true, message: errorMessage, type: NotificationType.Error });
    //   }
    //
    //   this.sharedService.emitChange({ action: 'preloader', value: false });

    // throw new Error(error);
    //   }
    //
    //   this.sharedService.emitChange({ action: 'preloader', value: false });
    //
    //   console.warn(error);
    // }

  }
}
