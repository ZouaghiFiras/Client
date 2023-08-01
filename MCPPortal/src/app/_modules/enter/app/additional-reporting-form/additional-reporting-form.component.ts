import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../core/state';
import {AdditionalReportingForm} from '../core/interfaces/additional-reporting-form.interface';
import {distinctUntilChanged, map, take} from 'rxjs/operators';
import {AdditionalReportingFormPageActions} from './actions';
import {merge} from 'rxjs';

@Component({
  selector: 'app-additional-reporting-form',
  templateUrl: './additional-reporting-form.component.html',
})
export class AdditionalReportingFormComponent implements OnInit {
  title = 'Additional Reporting Form';

  public current = 3;

  public steps = [
    { label: 'Additional Questions', icon: 'user' },
    { label: 'Additional Activities', icon: 'book' },
    { label: 'Activity Execution', icon: 'paperclip'},
    { label: 'Reporting Form', icon: 'file-add' },
    { label: 'Delivery Method', icon: 'file-add' },
    { label: 'Additional Documents', icon: 'file-add' },
  ];

  additionalReportingFormForm = this.fb.group(
    {
      reportingForm: [null],
    }
  );

  reportingFormCtrl = this.additionalReportingFormForm.get('reportingForm');

  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.store
      .select(fromRoot.selectAdditionalReportingFormGroupData)
      .pipe(take(1))
      .subscribe((additionalReportingForm: AdditionalReportingForm) =>
        this.additionalReportingFormForm.patchValue(additionalReportingForm, { emitEvent: false })
      );

    const reportingForm$ = this.reportingFormCtrl.valueChanges.pipe(
      map((reportingForm: string) => ({ reportingForm } as Partial<AdditionalReportingForm>))
    );

    merge(
      reportingForm$,
    ).subscribe((payload: Partial<AdditionalReportingForm>) => {
      this.store.dispatch(AdditionalReportingFormPageActions.patch({ payload }));
    });

    this.additionalReportingFormForm.valueChanges
      .pipe(
        map(() => this.additionalReportingFormForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(
          AdditionalReportingFormPageActions.changeValidationStatus({ isValid })
        )
      );
  }

  goToNextStep() {
    if (this.additionalReportingFormForm.invalid) {
      this.submitted = true;
      return;
    }

    this.router.navigate(['enter/property/additional_delivery_method']);
  }

  goToPreviousStep() {
    this.router.navigate(['enter/property/additional_activity_execution']);
  }
}
