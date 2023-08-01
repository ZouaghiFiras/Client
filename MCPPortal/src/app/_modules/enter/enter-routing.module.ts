import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SummaryComponent} from './app/shared/summary/summary.component';
import {EnterComponent} from './enter/enter.component';
import {PropertyComponent} from './enter/property/property.component';


const routes: Routes = [
  {
    path: '', component: EnterComponent,
  },
  {
    path: 'property', component: PropertyComponent,
    children: [
      {
        path: 'reporter_selection',
        loadChildren: () =>
          import('../enter/app/reporter-selection/reporter-selection.module').then(m => m.ReporterSelectionModule)
      },
      {
        path: 'reporter_information',
        loadChildren: () =>
          import('../enter/app/reporter-information/reporter-information.module').then(m => m.ReporterInformationModule)
      },
      {
        path: 'product_activity',
        loadChildren: () =>
          import('../enter/app/product-activity/product-activity.module').then(m => m.ProductActivityModule)
      },
      {
        path: 'product_coverage',
        loadChildren: () =>
          import('../enter/app/product-coverage/product-coverage.module').then(m => m.ProductCoverageModule)
      },
      {
        path: 'product_object',
        loadChildren: () =>
          import('../enter/app/product-object/product-object.module').then(m => m.ProductObjectModule)
      },
      {
        path: 'product_sub_object',
        loadChildren: () =>
          import('../enter/app/product-sub-object/product-sub-object.module').then(m => m.ProductSubObjectModule)
      },
      {
        path: 'party',
        loadChildren: () =>
          import('../enter/app/Party/party.module').then(m => m.PartyModule)
      },
      {
        path: 'parties',
        loadChildren: () =>
          import('../enter/app/Parties/parties.module').then(m => m.PartiesModule)
      },
      {
        path: 'object',
        loadChildren: () =>
          import('../enter/app/Object/object.module').then(m => m.ObjectModule)
      },
      {
        path: 'damage_cause',
        loadChildren: () =>
          import('../enter/app/damage-cause/damage-cause.module').then(m => m.DamageCauseModule)
      },
      {
        path: 'damage_additional_information',
        loadChildren: () =>
          import('../enter/app/damage-additional-information/damage-additional-information.module')
            .then(m => m.DamageAdditionalInformationModule)
      },
      {
        path: 'damage_sub_reason',
        loadChildren: () =>
          import('../enter/app/damage-sub-reason/damage-sub-reason.module').then(m => m.DamageSubReasonModule)
      },
      {
        path: 'damage_reason',
        loadChildren: () =>
          import('../enter/app/damage-reason/damage-reason.module').then(m => m.DamageReasonModule)
      },
      {
        path: 'damage_main_reason',
        loadChildren: () =>
          import('../enter/app/damage-main-reason/damage-main-reason.module').then(m => m.DamageMainReasonModule)
      },
      {
        path: 'additional_documents',
        loadChildren: () =>
          import('../enter/app/additional-documents/additional-documents.module').then(m => m.AdditionalDocumentsModule)
      },
      {
        path: 'additional_delivery_method',
        loadChildren: () =>
          import('../enter/app/additional-delivery-method/additional-delivery-method.module').then(m => m.AdditionalDeliveryMethodModule)
      },
      {
        path: 'additional_reporting_form',
        loadChildren: () =>
          import('../enter/app/additional-reporting-form/additional-reporting-form.module').then(m => m.AdditionalReportingFormModule)
      },
      {
        path: 'additional_activity_execution',
        loadChildren: () =>
          import('../enter/app/additional-activity-execution/additional-activity-execution.module')
            .then(m => m.AdditionalActivityExecutionModule)
      },
      {
        path: 'additional_questions',
        loadChildren: () =>
          import('../enter/app/additional-questions/additional-questions.module').then(m => m.AdditionalQuestionsModule)
      },
      {
        path: 'additional_activities',
        loadChildren: () =>
          import('../enter/app/additional-activities/additional-activities.module').then(m => m.AdditionalActivitiesModule)
      },
      {
        path: 'appointment',
        loadChildren: () =>
          import('../enter/app/Appointment/appointment.module').then(m => m.AppointmentModule)
      },
      {
        path: 'summary', component: SummaryComponent
      }
    ]
  }
  ];


@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EnterRoutingModule { }
