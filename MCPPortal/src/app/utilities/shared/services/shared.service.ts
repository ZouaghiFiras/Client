import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * The class name's SharedService
 */
export class SharedService {
  approuvedChanges$ = new Subject<boolean>();
  private emitChangeSource = new Subject<any>();
  public changeEmitted$ = this.emitChangeSource.asObservable();

  constructor(private translateService: TranslateService) {
  }

  public emitChange(change: any): void {
    this.emitChangeSource.next(change);
  }

  emitSuccess() {
    this.emitChange({action: 'notification', value: {state: 'success', notificationMessage: 'SAVEDSUCCESS'}});
  }

  emitSuccessWithMessage(message) {
    this.emitChange({action: 'notification', value: {state: 'success', notificationMessage: message}});
  }

  emitError(message, params) {
    this.emitChange({action: 'notification', value: {state: 'error', notificationMessage: message, notificationParams: params}});
  }

  emitMessageError(message) {
    this.emitChange({action: 'notification', value: {state: 'error', notificationMessage: message}});
  }

  emitSaveData(action, message, data) {
    this.emitChange({action: 'saveData', message, value: {action, data}});
  }

  getLanguage() {
    const language = this.translateService.getDefaultLang();
    return language;
  }
}
