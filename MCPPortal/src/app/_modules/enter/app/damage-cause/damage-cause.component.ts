import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../core/state';
import {DamageCause} from '../core/interfaces/damage-cause.interface';
import {distinctUntilChanged, map, take} from 'rxjs/operators';
import {DamageCausePageActions} from './actions';
import {merge, of} from 'rxjs';
import {ProspectApiService} from '../../../../_services';
import {DamageSubReason} from '../core/interfaces/damage-sub-reason.interface';
import {DamageSubReasonPageActions} from '../damage-sub-reason/actions';

@Component({
  selector: 'app-damage-cause',
  templateUrl: './damage-cause.component.html',
})
export class DamageCauseComponent implements OnInit {
  title = 'Damage Cause';
  public current = 3;

  public steps = [
    { label: 'Damage Main Reason', icon: 'user' },
    { label: 'Damage Reason', icon: 'book' },
    { label: 'Damage Sub-Reason', icon: 'paperclip' },
    { label: 'Damage Cause', icon: 'file-add' },
    { label: 'Damage Additional Information', icon: 'file-add' },
  ];
  damageCauseNamesAndIcons: { name: string; icon: string; id: string }[] = [];

  public selectedCause = '';
  damageCauseForm = this.fb.group(
    {
      cause: [null, [Validators.required]],
    },
    {
      updateOn: 'blur',
    }
  );
  causeCtrl = this.damageCauseForm.get('cause');
  submitted = false;

  constructor(
    private prospectApiService: ProspectApiService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.prospectApiService.loadDamageCauseNamesAndIcons().subscribe(
      damageCauseNamesAndIcons => {
        if (damageCauseNamesAndIcons && damageCauseNamesAndIcons.length) {
          this.damageCauseNamesAndIcons = damageCauseNamesAndIcons;
          console.log(this.damageCauseNamesAndIcons);

          // Check if there is only one option available
          if (damageCauseNamesAndIcons.length === 1) {
            this.damageCauseForm.patchValue({ cause: damageCauseNamesAndIcons[0].name });
            this.goToNextStep();
          }
        } else {
          this.submitted = true;
          this.router.navigate(['enter/property/damage_cause']);
        }
      },
      error => {
        console.error(error);
      }
    );
    this.store
      .select(fromRoot.selectDamageCauseGroupData)
      .pipe(take(1))
      .subscribe((damageCause: DamageCause) =>
        this.damageCauseForm.patchValue(damageCause, { emitEvent: false })
      );

    const cause$ = this.causeCtrl.valueChanges.pipe(
      map((cause: string) => ({ cause } as Partial<DamageCause>))
    );

    merge(cause$, of(null)).subscribe((payload: Partial<DamageCause>) => {
      this.store.dispatch(DamageCausePageActions.patch({ payload }));
    });

    this.damageCauseForm.valueChanges
      .pipe(
        map(() => this.damageCauseForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(
          DamageCausePageActions.changeValidationStatus({ isValid })
        )
      );
  }

  selectCause(reasonId: string) {
    this.selectedCause = reasonId;
    this.prospectApiService.setDamageCauseData(this.selectedCause);
  }


  goToNextStep() {
    if (this.damageCauseForm.invalid) {
      this.submitted = true;
      return;
    }

    this.router.navigate(['enter/property/damage_additional_information']);
  }

  goToPreviousStep() {
    this.router.navigate(['enter/property/damage_sub_reason']);
  }
}
