import {ActionReducerMap, createSelector, MetaReducer} from '@ngrx/store';

import * as fromReporterSelection from './reporter-selection.reducer';
import * as fromReporterInformation from './reporter-information.reducer';
import * as fromAdditionalDocuments from './additional-documents.reducer';
import * as fromAdditionalDeliveryMethod from './additional-delivery-method.reducer';
import * as fromAdditionalReportingForm from './additional-reporting-form.reducer';
import * as fromAdditionalActivityExecution from './additional-activity-execution.reducer';
import * as fromAdditionalActivities from './additional-activities.reducer';
import * as fromAdditionalQuestions from './additional-questions.reducer';
import * as fromAppointment from './appointment.reducer';
import * as fromDamageAdditionalInformation from './damage-additional-information.reducer';
import * as fromDamageCause from './damage-cause.reducer';
import * as fromDamageSubReason from './damage-sub-reason.reducer';
import * as fromDamageReason from './damage-reason.reducer';
import * as fromDamageMainReason from './damage-main-reason.reducer';
import * as fromObject from './object.reducer';
import * as fromParty from './party.reducer';
import * as fromParties from './parties.reducer';
import * as fromProductActivity from './product-activity.reducer';
import * as fromProductCoverage from './product-coverage.reducer';
import * as fromProductObject from './product-object.reducer';
import * as fromProductSubObject from './product-sub-object.reducer';
import {ReporterSelectionGroup} from '../models/reporter-selection.model';
import {ReporterInformationGroup} from '../models/reporter-information.model';
import {AdditionalDocumentsGroup} from '../models/additional-documents.model';
import {AdditionalDeliveryMethodGroup} from '../models/additional-delivery-method.model';
import {AdditionalReportingFormGroup} from '../models/additional-reporting-form.model';
import {AdditionalActivityExecutionGroup} from '../models/additional-activity-execution.model';
import {AdditionalActivitiesGroup} from '../models/additional-activities.model';
import {AdditionalQuestionsGroup} from '../models/additional-questions.model';
import {DamageAdditionalInformationGroup} from '../models/damage-additional-information.model';
import {DamageCauseGroup} from '../models/damage-cause.model';
import {DamageSubReasonGroup} from '../models/damage-sub-reason.model';
import {DamageReasonGroup} from '../models/damage-reason.model';
import {DamageMainReasonGroup} from '../models/damage-main-reason.model';
import {ObjectGroup} from '../models/object.model';
import {PartyGroup} from '../models/party.model';
import {PartiesGroup} from '../models/parties.model';
import {ProductActivityGroup} from '../models/product-activity.model';
import {ProductCoverageGroup} from '../models/product-coverage.model';
import {ProductObjectGroup} from '../models/product-object.model';
import {ProductSubObjectGroup} from '../models/product-sub-object.model';
import {AppointmentGroup} from '../models/appointment.model';

export interface State {
  reporterSelection: ReporterSelectionGroup;
  reporterInformation: ReporterInformationGroup;
  additionalDocuments: AdditionalDocumentsGroup;
  additionalDeliveryMethod: AdditionalDeliveryMethodGroup;
  additionalReportingForm: AdditionalReportingFormGroup;
  additionalActivityExecution: AdditionalActivityExecutionGroup;
  additionalActivities: AdditionalActivitiesGroup;
  additionalQuestions: AdditionalQuestionsGroup;
  appointment: AppointmentGroup;
  damageAdditionalInformation: DamageAdditionalInformationGroup;
  damageCause: DamageCauseGroup;
  damageSubReason: DamageSubReasonGroup;
  damageReason: DamageReasonGroup;
  damageMainReason: DamageMainReasonGroup;
  object: ObjectGroup;
  party: PartyGroup;
  parties: PartiesGroup;
  productActivity: ProductActivityGroup;
  productCoverage: ProductCoverageGroup;
  productObject: ProductObjectGroup;
  productSubObject: ProductSubObjectGroup;
}

export const reducers: ActionReducerMap<State> = {
  reporterSelection: fromReporterSelection.reducer,
  reporterInformation: fromReporterInformation.reducer,
  additionalDocuments: fromAdditionalDocuments.reducer,
  additionalDeliveryMethod: fromAdditionalDeliveryMethod.reducer,
  additionalReportingForm: fromAdditionalReportingForm.reducer,
  additionalActivityExecution: fromAdditionalActivityExecution.reducer,
  additionalActivities: fromAdditionalActivities.reducer,
  additionalQuestions: fromAdditionalQuestions.reducer,
  appointment: fromAppointment.reducer,
  damageAdditionalInformation: fromDamageAdditionalInformation.reducer,
  damageCause: fromDamageCause.reducer,
  damageSubReason: fromDamageSubReason.reducer,
  damageReason: fromDamageReason.reducer,
  damageMainReason: fromDamageMainReason.reducer,
  object: fromObject.reducer,
  party: fromParty.reducer,
  parties: fromParties.reducer,
  productActivity: fromProductActivity.reducer,
  productCoverage: fromProductCoverage.reducer,
  productObject: fromProductObject.reducer,
  productSubObject: fromProductSubObject.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];


export const selectReporterSelectionGroup = (state: State) => state.reporterSelection;
export const selectReporterSelectionGroupData = createSelector(
  selectReporterSelectionGroup,
  fromReporterSelection.selectReporterSelectionGroupData
);
export const selectReporterSelectionGroupIsValid = createSelector(
  selectReporterSelectionGroup,
  fromReporterSelection.selectReporterSelectionGroupIsValid
);

export const selectReporterInformationGroup = (state: State) => state.reporterInformation;
export const selectReporterInformationGroupData = createSelector(
  selectReporterInformationGroup,
  fromReporterInformation.selectReporterInformationGroupData
);
export const selectReporterInformationGroupIsValid = createSelector(
  selectReporterInformationGroup,
  fromReporterInformation.selectReporterInformationGroupIsValid
);


export const selectProductActivityGroup = (state: State) => state.productActivity;
export const selectProductActivityGroupData = createSelector(
  selectProductActivityGroup,
  fromProductActivity.selectProductActivityGroupData
);
export const selectProductActivityGroupIsValid = createSelector(
  selectProductActivityGroup,
  fromProductActivity.selectProductActivityGroupIsValid
);


export const selectProductCoverageGroup = (state: State) => state.productCoverage;
export const selectProductCoverageGroupData = createSelector(
  selectProductCoverageGroup,
  fromProductCoverage.selectProductCoverageGroupData
);
export const selectProductCoverageGroupIsValid = createSelector(
  selectProductCoverageGroup,
  fromProductCoverage.selectProductCoverageGroupIsValid
);


export const selectProductObjectGroup = (state: State) => state.productObject;
export const selectProductObjectGroupData = createSelector(
  selectProductObjectGroup,
  fromProductObject.selectProductObjectGroupData
);
export const selectProductObjectGroupIsValid = createSelector(
  selectProductObjectGroup,
  fromProductObject.selectProductObjectGroupIsValid
);


export const selectProductSubObjectGroup = (state: State) => state.productSubObject;
export const selectProductSubObjectGroupData = createSelector(
  selectProductSubObjectGroup,
  fromProductSubObject.selectProductSubObjectGroupData
);
export const selectProductSubObjectGroupIsValid = createSelector(
  selectProductSubObjectGroup,
  fromProductSubObject.selectProductSubObjectGroupIsValid
);


export const selectPartyGroup = (state: State) => state.party;
export const selectPartyGroupData = createSelector(
  selectPartyGroup,
  fromParty.selectPartyGroupData
);
export const selectPartyGroupIsValid = createSelector(
  selectPartyGroup,
  fromParty.selectPartyGroupIsValid
);



export const selectPartiesGroup = (state: State) => state.parties;
export const selectPartiesGroupData = createSelector(
  selectPartiesGroup,
  fromParties.selectPartiesGroupData
);
export const selectPartiesGroupIsValid = createSelector(
  selectPartiesGroup,
  fromParties.selectPartiesGroupIsValid
);


export const selectObjectGroup = (state: State) => state.object;
export const selectObjectGroupData = createSelector(
  selectObjectGroup,
  fromObject.selectObjectGroupData
);
export const selectObjectGroupIsValid = createSelector(
  selectObjectGroup,
  fromObject.selectObjectGroupIsValid
);



export const selectDamageAdditionalInformationGroup = (state: State) => state.damageAdditionalInformation;
export const selectDamageAdditionalInformationGroupData = createSelector(
  selectDamageAdditionalInformationGroup,
  fromDamageAdditionalInformation.selectDamageAdditionalInformationGroupData
);
export const selectDamageAdditionalInformationGroupIsValid = createSelector(
  selectDamageAdditionalInformationGroup,
  fromDamageAdditionalInformation.selectDamageAdditionalInformationGroupIsValid
);


export const selectDamageCauseGroup = (state: State) => state.damageCause;
export const selectDamageCauseGroupData = createSelector(
  selectDamageCauseGroup,
  fromDamageCause.selectDamageCauseGroupData
);
export const selectDamageCauseGroupIsValid = createSelector(
  selectDamageCauseGroup,
  fromDamageCause.selectDamageCauseGroupIsValid
);

export const selectDamageMainReasonGroup = (state: State) => state.damageMainReason;
export const selectDamageMainReasonGroupData = createSelector(
  selectDamageMainReasonGroup,
  fromDamageMainReason.selectDamageMainReasonGroupData
);
export const selectDamageMainReasonGroupIsValid = createSelector(
  selectDamageMainReasonGroup,
  fromDamageMainReason.selectDamageMainReasonGroupIsValid
);


export const selectDamageReasonGroup = (state: State) => state.damageReason;
export const selectDamageReasonGroupData = createSelector(
  selectDamageReasonGroup,
  fromDamageReason.selectDamageReasonGroupData
);
export const selectDamageReasonGroupIsValid = createSelector(
  selectDamageReasonGroup,
  fromDamageReason.selectDamageReasonGroupIsValid
);



export const selectDamageSubReasonGroup = (state: State) => state.damageSubReason;
export const selectDamageSubReasonGroupData = createSelector(
  selectDamageSubReasonGroup,
  fromDamageSubReason.selectDamageSubReasonGroupData
);
export const selectDamageSubReasonGroupIsValid = createSelector(
  selectDamageSubReasonGroup,
  fromDamageSubReason.selectDamageSubReasonGroupIsValid
);

export const selectAdditionalDocumentsGroup = (state: State) => state.additionalDocuments;
export const selectAdditionalDocumentsGroupData = createSelector(
  selectAdditionalDocumentsGroup,
  fromAdditionalDocuments.selectAdditionalDocumentsGroupData
);
export const selectAdditionalDocumentsGroupIsValid = createSelector(
  selectAdditionalDocumentsGroup,
  fromAdditionalDocuments.selectAdditionalDocumentsGroupIsValid
);

export const selectAdditionalDeliveryMethodGroup = (state: State) => state.additionalDeliveryMethod;
export const selectAdditionalDeliveryMethodGroupData = createSelector(
  selectAdditionalDeliveryMethodGroup,
  fromAdditionalDeliveryMethod.selectAdditionalDeliveryMethodGroupData
);
export const selectAdditionalDeliveryMethodGroupIsValid = createSelector(
  selectAdditionalDeliveryMethodGroup,
  fromAdditionalDeliveryMethod.selectAdditionalDeliveryMethodGroupIsValid
);

export const selectAdditionalReportingFormGroup = (state: State) => state.additionalReportingForm;
export const selectAdditionalReportingFormGroupData = createSelector(
  selectAdditionalReportingFormGroup,
  fromAdditionalReportingForm.selectAdditionalReportingFormGroupData
);
export const selectAdditionalReportingFormGroupIsValid = createSelector(
  selectAdditionalReportingFormGroup,
  fromAdditionalReportingForm.selectAdditionalReportingFormGroupIsValid
);

export const selectAdditionalActivityExecutionGroup = (state: State) => state.additionalActivityExecution;
export const selectAdditionalActivityExecutionGroupData = createSelector(
  selectAdditionalActivityExecutionGroup,
  fromAdditionalActivityExecution.selectAdditionalActivityExecutionGroupData
);
export const selectAdditionalActivityExecutionGroupIsValid = createSelector(
  selectAdditionalActivityExecutionGroup,
  fromAdditionalActivityExecution.selectAdditionalActivityExecutionGroupIsValid
);

export const selectAdditionalActivitiesGroup = (state: State) => state.additionalActivities;
export const selectAdditionalActivitiesGroupData = createSelector(
  selectAdditionalActivitiesGroup,
  fromAdditionalActivities.selectAdditionalActivitiesGroupData
);
export const selectAdditionalActivitiesGroupIsValid = createSelector(
  selectAdditionalActivitiesGroup,
  fromAdditionalActivities.selectAdditionalActivitiesGroupIsValid
);


export const selectAdditionalQuestionsGroup = (state: State) => state.additionalQuestions;
export const selectAdditionalQuestionsGroupData = createSelector(
  selectAdditionalQuestionsGroup,
  fromAdditionalQuestions.selectAdditionalQuestionsGroupData
);
export const selectAdditionalQuestionsGroupIsValid = createSelector(
  selectAdditionalQuestionsGroup,
  fromAdditionalQuestions.selectAdditionalQuestionsGroupIsValid
);


export const selectAppointmentGroup = (state: State) => state.appointment;
export const selectAppointmentGroupData = createSelector(
  selectAppointmentGroup,
  fromAppointment.selectAppointmentGroupData
);
export const selectAppointmentGroupIsValid = createSelector(
  selectAppointmentGroup,
  fromAppointment.selectAppointmentGroupIsValid
);

