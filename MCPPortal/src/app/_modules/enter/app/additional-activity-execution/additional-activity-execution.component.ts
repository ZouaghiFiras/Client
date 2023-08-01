import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../core/state';
import {AdditionalActivityExecution} from '../core/interfaces/additional-activity-execution.interface';
import {distinctUntilChanged, map, take} from 'rxjs/operators';
import {AdditionalActivityExecutionPageActions} from './actions';
import {merge} from 'rxjs';

@Component({
  selector: 'app-additional-activity-execution',
  templateUrl: './additional-activity-execution.component.html',
})
export class AdditionalActivityExecutionComponent implements OnInit {
  title = 'Additional Activity Execution';

  public current = 2;

  public steps = [
    { label: 'Additional Questions', icon: 'user' },
    { label: 'Additional Activities', icon: 'book' },
    { label: 'Activity Execution', icon: 'paperclip'},
    { label: 'Reporting Form', icon: 'file-add' },
    { label: 'Delivery Method', icon: 'file-add' },
    { label: 'Additional Documents', icon: 'file-add' },
  ];

  additionalActivityExecutionForm = this.fb.group(
    {
      activityExecution: [null],
    }
  );
  activityExecutionCtrl = this.additionalActivityExecutionForm.get('activityExecution');
  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.store
      .select(fromRoot.selectAdditionalActivityExecutionGroupData)
      .pipe(take(1))
      .subscribe((additionalActivityExecution: AdditionalActivityExecution) =>
        this.additionalActivityExecutionForm.patchValue(additionalActivityExecution, { emitEvent: false })
      );
    const activityExecution$ = this.activityExecutionCtrl.valueChanges.pipe(
      map((activityExecution: string) => ({ activityExecution } as Partial<AdditionalActivityExecution>))
    );
    merge(
      activityExecution$,
    ).subscribe((payload: Partial<AdditionalActivityExecution>) => {
      this.store.dispatch(AdditionalActivityExecutionPageActions.patch({ payload }));
    });

    this.additionalActivityExecutionForm.valueChanges
      .pipe(
        map(() => this.additionalActivityExecutionForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(
          AdditionalActivityExecutionPageActions.changeValidationStatus({ isValid })
        )
      );
  }

  goToNextStep() {
    if (this.additionalActivityExecutionForm.invalid) {
      this.submitted = true;
      return;
    }

    this.router.navigate(['enter/property/additional_reporting_form']);
  }

  goToPreviousStep() {
    this.router.navigate(['enter/property/additional_activities']);
  }
}
