import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {FormBuilder, FormGroup} from '@angular/forms';
import {
  selectAdditionalActivitiesGroupData,
  selectAdditionalActivityExecutionGroupData,
  selectAdditionalDeliveryMethodGroupData,
  selectAdditionalDocumentsGroupData,
  selectAdditionalQuestionsGroupData,
  selectAdditionalReportingFormGroupData,
  selectAppointmentGroupData,
  selectDamageAdditionalInformationGroupData,
  selectDamageCauseGroupData,
  selectDamageMainReasonGroupData,
  selectDamageReasonGroupData,
  selectDamageSubReasonGroupData,
  selectObjectGroupData,
  selectPartyGroupData,
  selectProductActivityGroupData,
  selectProductCoverageGroupData,
  selectProductObjectGroupData,
  selectProductSubObjectGroupData,
  selectReporterInformationGroupData,
  selectReporterSelectionGroupData,
  State,
} from '../../core/state';
import {ReporterSelectionGroup} from '../../core/models/reporter-selection.model';
import {ReporterInformationGroup} from '../../core/models/reporter-information.model';
import {ProductActivityGroup} from '../../core/models/product-activity.model';
import {PartyGroup} from '../../core/models/party.model';
import {ObjectGroup} from '../../core/models/object.model';
import {AppointmentGroup} from '../../core/models/appointment.model';
import {ProductCoverageGroup} from '../../core/models/product-coverage.model';
import {ProductObjectGroup} from '../../core/models/product-object.model';
import {ProductSubObjectGroup} from '../../core/models/product-sub-object.model';
import {AdditionalQuestionsGroup} from '../../core/models/additional-questions.model';
import {AdditionalActivitiesGroup} from '../../core/models/additional-activities.model';
import {AdditionalActivityExecutionGroup} from '../../core/models/additional-activity-execution.model';
import {AdditionalReportingFormGroup} from '../../core/models/additional-reporting-form.model';
import {AdditionalDeliveryMethodGroup} from '../../core/models/additional-delivery-method.model';
import {AdditionalDocumentsGroup} from '../../core/models/additional-documents.model';
import {DamageMainReasonGroup} from '../../core/models/damage-main-reason.model';
import {DamageReasonGroup} from '../../core/models/damage-reason.model';
import {DamageSubReasonGroup} from '../../core/models/damage-sub-reason.model';
import {DamageCauseGroup} from '../../core/models/damage-cause.model';
import {DamageAdditionalInformationGroup} from '../../core/models/damage-additional-information.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
})
export class SummaryComponent implements OnInit {
  // Toggle flags for each form summary
  toggleReporterForm = false;
  toggleReporterSelectionForm = false;
  toggleReporterInformationForm = false;
  toggleProductForm = false;
  toggleProductActivityForm = false;
  toggleProductCoverageForm = false;
  toggleProductObjectForm = false;
  toggleProductSubObjectForm = false;
  togglePartyForm = false;
  toggleObjectForm = false;
  toggleDamageForm = false;
  toggleDamageMainReasonForm = false;
  toggleDamageReasonForm = false;
  toggleDamageSubReasonForm = false;
  toggleDamageCauseForm = false;
  toggleAdditionalForm = false;
  toggleDamageAdditionalInformationForm = false;
  toggleAdditionalQuestionsForm = false;
  toggleAdditionalActivitiesForm = false;
  toggleAdditionalActivityExecutionForm = false;
  toggleAdditionalReportingFormForm = false;
  toggleAdditionalDeliveryMethodForm = false;
  toggleAdditionalDocumentsForm = false;
  toggleAppointmentForm = false;
// Initialize form groups
  reporterSelectionGroup = new ReporterSelectionGroup();
  reporterInformationGroup = new ReporterInformationGroup();
  productActivityGroup = new ProductActivityGroup();
  productCoverageGroup = new ProductCoverageGroup();
  productObjectGroup = new ProductObjectGroup();
  productSubObjectGroup = new ProductSubObjectGroup();
  partyGroup = new PartyGroup();
  objectGroup = new ObjectGroup();
  damageMainReasonGroup = new DamageMainReasonGroup();
  damageReasonGroup = new DamageReasonGroup();
  damageSubReasonGroup = new DamageSubReasonGroup();
  damageCauseGroup = new DamageCauseGroup();
  damageAdditionalInformationGroup = new DamageAdditionalInformationGroup();
  additionalQuestionsGroup = new AdditionalQuestionsGroup();
  additionalActivitiesGroup = new AdditionalActivitiesGroup();
  additionalActivityExecutionGroup = new AdditionalActivityExecutionGroup();
  additionalReportingFormGroup = new AdditionalReportingFormGroup();
  additionalDeliveryMethodGroup = new AdditionalDeliveryMethodGroup();
  additionalDocumentsGroup = new AdditionalDocumentsGroup();
  appointmentGroup = new AppointmentGroup();

  // summaryForm: FormGroup;

  constructor(
    private store: Store<State>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // // Create summary form
    // this.summaryForm = this.formBuilder.group({
    //   reporterSelection: reporterSelectionGroup.data,
    //   reporterInformation: reporterInformationGroup.data,
    //   productActivity: productActivityGroup.data,
    //   productCoverage: productCoverageGroup.data,
    //   productObject: productObjectGroup.data,
    //   productSubObject: productSubObjectGroup.data,
    //   party: partyGroup.data,
    //   object: objectGroup.data,
    //   damageMainReason: damageMainReasonGroup.data,
    //   damageReason: damageReasonGroup.data,
    //   damageSubReason: damageSubReasonGroup.data,
    //   damageCause: damageCauseGroup.data,
    //   damageAdditionalInformation: damageAdditionalInformationGroup.data,
    //   additionalQuestions: additionalQuestionsGroup.data,
    //   additionalActivities: additionalActivitiesGroup.data,
    //   additionalActivityExecution: additionalActivityExecutionGroup.data,
    //   additionalReportingForm: additionalReportingFormGroup.data,
    //   additionalDeliveryMethod: additionalDeliveryMethodGroup.data,
    //   additionalDocuments: additionalDocumentsGroup.data,
    //   appointment: appointmentGroup.data,
    // });

    // Subscribe to the store selectors and update form values
    this.store.pipe(select(selectReporterSelectionGroupData)).subscribe((data) => {
      this.reporterSelectionGroup.data = data;
    });
    this.store.pipe(select(selectReporterInformationGroupData)).subscribe((data) => {
      this.reporterInformationGroup.data = data;
    });

    this.store.pipe(select(selectProductActivityGroupData)).subscribe((data) => {
      this.productActivityGroup.data = data;
    });

    this.store.pipe(select(selectProductCoverageGroupData)).subscribe((data) => {
      this.productCoverageGroup.data = data;
    });

    this.store.pipe(select(selectProductObjectGroupData)).subscribe((data) => {
      this.productObjectGroup.data = data;
    });

    this.store.pipe(select(selectProductSubObjectGroupData)).subscribe((data) => {
      this.productSubObjectGroup.data = data;
    });

    this.store.pipe(select(selectPartyGroupData)).subscribe((data) => {
      this.partyGroup.data = data;
    });

    this.store.pipe(select(selectObjectGroupData)).subscribe((data) => {
      this.objectGroup.data = data;
    });

    this.store.pipe(select(selectDamageMainReasonGroupData)).subscribe((data) => {
      this.damageMainReasonGroup.data = data;
    });

    this.store.pipe(select(selectDamageReasonGroupData)).subscribe((data) => {
      this.damageReasonGroup.data = data;
    });

    this.store.pipe(select(selectDamageSubReasonGroupData)).subscribe((data) => {
      this.damageSubReasonGroup.data = data;
    });

    this.store.pipe(select(selectDamageCauseGroupData)).subscribe((data) => {
      this.damageCauseGroup.data = data;
    });

    this.store.pipe(select(selectDamageAdditionalInformationGroupData)).subscribe((data) => {
      this.damageAdditionalInformationGroup.data = data;
    });

    this.store.pipe(select(selectAdditionalQuestionsGroupData)).subscribe((data) => {
      this.additionalQuestionsGroup.data = data;
    });

    this.store.pipe(select(selectAdditionalActivitiesGroupData)).subscribe((data) => {
      this.additionalActivitiesGroup.data = data;
    });

    this.store.pipe(select(selectAdditionalActivityExecutionGroupData)).subscribe((data) => {
      this.additionalActivityExecutionGroup.data = data;
    });

    this.store.pipe(select(selectAdditionalReportingFormGroupData)).subscribe((data) => {
      this.additionalReportingFormGroup.data = data;
    });

    this.store.pipe(select(selectAdditionalDeliveryMethodGroupData)).subscribe((data) => {
      this.additionalDeliveryMethodGroup.data = data;
    });

    this.store.pipe(select(selectAdditionalDocumentsGroupData)).subscribe((data) => {
      this.additionalDocumentsGroup.data = data;
    });

    this.store.pipe(select(selectAppointmentGroupData)).subscribe((data) => {
      this.appointmentGroup.data = data;
    });
  }

  // submitForm() {
  //   if (this.summaryForm.valid) {
  //     // Form submission logic here
  //     console.log('Form submitted successfully');
  //     // Reset form groups and navigate to success page
  //     // Resetting form groups can be done using:
  //     // this.reporterSelectionGroup.reset();
  //     // this.reporterInformationGroup.reset();
  //     // ...
  //   } else {
  //     // Handle form validation errors
  //     console.log('Form is not valid');
  //   }
  // }
}
