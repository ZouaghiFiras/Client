import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class PreloaderService {
  private emitChangeSource = new Subject<any>();
  public changeEmitted$ = this.emitChangeSource.asObservable();

  constructor() {
  }

  /**
   * EmitChange() methode for changing
   */
  public emitChange(change: any): void {
    this.emitChangeSource.next(change);
  }

  showPreloader(): void {
    this.emitChange({action: 'preloader', value: true});
  }

  hidePreloader(): void {
    this.emitChange({action: 'preloader', value: false});
  }
}
