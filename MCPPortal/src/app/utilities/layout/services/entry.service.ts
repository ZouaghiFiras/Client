// Angular
import {Injectable} from '@angular/core';

// Rx
import {Subject} from 'rxjs';

@Injectable()
export class EntryService {
  private dataObs$ = new Subject();

  getData() {
    return this.dataObs$;
  }

  updateData(data: any) {
    this.dataObs$.next(data);
  }

  public getAction() {
    return this.dataObs$;
  }

  public executeCommand(data: any): void {
    this.dataObs$.next(data);
  }
}
