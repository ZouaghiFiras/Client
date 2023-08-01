import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  reporterSelectionGroupIsValid$ = this.store.select(fromRoot.selectReporterSelectionGroupIsValid);
  reporterInformationGroupIsValid$ = this.store.select(fromRoot.selectReporterInformationGroupIsValid);
  productActivityGroupIsValid$ = this.store.select(fromRoot.selectProductActivityGroupIsValid);
  productSubObjectGroupIsValid$ = this.store.select(fromRoot.selectProductSubObjectGroupIsValid);
  partyGroupIsValid$ = this.store.select(fromRoot.selectPartyGroupIsValid);
  objectGroupIsValid$ = this.store.select(fromRoot.selectObjectGroupIsValid);
  damageAdditionalInformationGroupIsValid$ = this.store.select(fromRoot.selectDamageAdditionalInformationGroupIsValid);
  additionalActivityExecutionGroupIsValid$ = this.store.select(fromRoot.selectAdditionalActivityExecutionGroupIsValid);
  additionalReportingFormGroupIsValid$ = this.store.select(fromRoot.selectAdditionalReportingFormGroupIsValid);
  additionalDeliveryMethodGroupIsValid$ = this.store.select(fromRoot.selectAdditionalDeliveryMethodGroupIsValid);
  additionalDocumentsGroupIsValid$ = this.store.select(fromRoot.selectAdditionalDocumentsGroupIsValid);
  appointmentGroupIsValid$ = this.store.select(fromRoot.selectAppointmentGroupIsValid);




  constructor(private store: Store<fromRoot.State>) {}
}
