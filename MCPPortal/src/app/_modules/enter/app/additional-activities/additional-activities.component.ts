import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../core/state';
import {AdditionalActivities} from '../core/interfaces/additional-activities.interface';
import {distinctUntilChanged, map, take} from 'rxjs/operators';
import {AdditionalActivitiesPageActions} from './actions';
import {merge} from 'rxjs';

@Component({
  selector: 'app-additional-activities',
  templateUrl: './additional-activities.component.html',
})
export class AdditionalActivitiesComponent implements OnInit {
  title = 'Additional Activities';

  public current = 1;

  public steps = [
    { label: 'Additional Questions', icon: 'user' },
    { label: 'Additional Activities', icon: 'book' },
    { label: 'Activity Execution', icon: 'paperclip'},
    { label: 'Reporting Form', icon: 'file-add' },
    { label: 'Delivery Method', icon: 'file-add' },
    { label: 'Additional Documents', icon: 'file-add' },
  ];

  additionalActivitiesForm = this.fb.group(
    {
      additionalActivities: [null],
    }
  );
  additionalActivitiesCtrl = this.additionalActivitiesForm.get('additionalActivities');
  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.store
      .select(fromRoot.selectAdditionalActivitiesGroupData)
      .pipe(take(1))
      .subscribe((additional: AdditionalActivities) =>
        this.additionalActivitiesForm.patchValue(additional, { emitEvent: false })
      );
    const additionalActivities$ = this.additionalActivitiesCtrl.valueChanges.pipe(
      map((additionalActivities: string) => ({ additionalActivities } as Partial<AdditionalActivities>))
    );

    merge(
      additionalActivities$,
    ).subscribe((payload: Partial<AdditionalActivities>) => {
      this.store.dispatch(AdditionalActivitiesPageActions.patch({ payload }));
    });

    this.additionalActivitiesForm.valueChanges
      .pipe(
        map(() => this.additionalActivitiesForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(
          AdditionalActivitiesPageActions.changeValidationStatus({ isValid })
        )
      );
  }

  goToNextStep() {
    if (this.additionalActivitiesForm.invalid) {
      this.submitted = true;
      return;
    }

    this.router.navigate(['enter/property/additional_activity_execution']);
  }

  goToPreviousStep() {
    this.router.navigate(['enter/property/additional_questions']);
  }
}
