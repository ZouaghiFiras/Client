import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../core/state';
import { DamageReason } from '../core/interfaces/damage-reason.interface';
import { distinctUntilChanged, map, take } from 'rxjs/operators';
import { DamageReasonPageActions } from './actions';
import { merge, of } from 'rxjs'; // Add 'of' import
import { ProspectApiService } from '../../../../_services';
import { DamageMainReason } from '../core/interfaces/damage-main-reason.interface';
import { DamageMainReasonPageActions } from '../damage-main-reason/actions';

@Component({
  selector: 'app-damage-reason',
  templateUrl: './damage-reason.component.html',
})
export class DamageReasonComponent implements OnInit {
  title = 'Damage Reason';
  public current = 1;

  public steps = [
    { label: 'Damage Main Reason', icon: 'user' },
    { label: 'Damage Reason', icon: 'book' },
    { label: 'Damage Sub-Reason', icon: 'paperclip' },
    { label: 'Damage Cause', icon: 'file-add' },
    { label: 'Damage Additional Information', icon: 'file-add' },
  ];
  damageReasonNamesAndIcons: { name: string; icon: string; id: string }[] = [];

  public selectedReason = '';
  damageReasonForm = this.fb.group(
    {
      reason: [null, [Validators.required]],
    },
    {
      updateOn: 'blur',
    }
  );
  reasonCtrl = this.damageReasonForm.get('reason');
  submitted = false;

  constructor(
    private prospectApiService: ProspectApiService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.prospectApiService.loadDamageReasonsNamesAndIcons().subscribe(
      damageReasonNamesAndIcons => {
        if (damageReasonNamesAndIcons && damageReasonNamesAndIcons.length) {
          this.damageReasonNamesAndIcons = damageReasonNamesAndIcons;
          console.log(this.damageReasonNamesAndIcons);
        } else {
          this.damageReasonForm.get('reason').clearValidators(); // Disable validation
          this.damageReasonForm.get('reason').updateValueAndValidity();
          this.damageReasonForm.patchValue({ reason: null });
          this.goToNextStep();
        }
      },
      error => {
        console.error(error);
      }
    );



    this.store
      .select(fromRoot.selectDamageReasonGroupData)
      .pipe(take(1))
      .subscribe((damageReason: DamageReason) =>
        this.damageReasonForm.patchValue(damageReason, { emitEvent: false })
      );

    const reason$ = this.reasonCtrl.valueChanges.pipe(
      map((reason: string) => ({ reason } as Partial<DamageReason>))
    );

    merge(reason$, of(null)).subscribe((payload: Partial<DamageReason>) => {
      this.store.dispatch(DamageReasonPageActions.patch({ payload }));
    });

    this.damageReasonForm.valueChanges
      .pipe(
        map(() => this.damageReasonForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(
          DamageReasonPageActions.changeValidationStatus({ isValid })
        )
      );
  }

  selectReason(reasonId: string) {
    this.selectedReason = reasonId;
    this.prospectApiService.setDamageReasonData(this.selectedReason);
  }

  goToNextStep() {
    if (this.damageReasonForm.invalid) {
      this.submitted = true;
      return;
    }

    this.router.navigate(['enter/property/damage_sub_reason']);
  }

  goToPreviousStep() {
    this.router.navigate(['enter/property/damage_main_reason']);
  }
}
