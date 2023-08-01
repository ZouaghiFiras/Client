/**
 * Angular
 */
import {Injectable} from '@angular/core';

/**
 * RXJS
 */
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * InsuranceClaimFormModel name's Theme service
 */
export class ThemeService {
  private activeTheme = new BehaviorSubject('blankThemeProps');

  /**
   * The constructor
   */
  constructor() {
  }

  /**
   * GetActiveTheme() methode is used to get the current theme choose
   */
  public getActiveTheme() {
    return this.activeTheme.asObservable();
  }

  /**
   * SetActiveTheme() methode to update the current Theme
   */
  public setActiveTheme(name) {
    this.activeTheme.next(name);
  }
}
