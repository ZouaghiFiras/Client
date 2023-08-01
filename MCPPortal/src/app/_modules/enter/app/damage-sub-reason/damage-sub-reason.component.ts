import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../core/state';
import {DamageSubReason} from '../core/interfaces/damage-sub-reason.interface';
import {distinctUntilChanged, map, take} from 'rxjs/operators';
import {DamageSubReasonPageActions} from './actions';
import {merge, of} from 'rxjs';
import {ProspectApiService} from '../../../../_services';

@Component({
  selector: 'app-damage-sub-reason',
  templateUrl: './damage-sub-reason.component.html',
})
export class DamageSubReasonComponent implements OnInit {
  title = 'Damage Sub-Reason';
  public current = 2;

  public steps = [
    { label: 'Damage Main Reason', icon: 'user' },
    { label: 'Damage Reason', icon: 'book' },
    { label: 'Damage Sub-Reason', icon: 'paperclip' },
    { label: 'Damage Cause', icon: 'file-add' },
    { label: 'Damage Additional Information', icon: 'file-add' },
  ];
  damageSubReasonNamesAndIcons: { name: string; icon: string; id: string }[] = [];

  public selectedSubReason = '';
  damageSubReasonForm = this.fb.group(
    {
      subReason: [null, [Validators.required]],
    },
    {
      updateOn: 'blur',
    }
  );
  subReasonCtrl = this.damageSubReasonForm.get('subReason');
  submitted = false;

  constructor(
    private prospectApiService: ProspectApiService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.prospectApiService.loadDamageSubReasonsNamesAndIcons().subscribe(
      damageSubReasonNamesAndIcons => {
        if (damageSubReasonNamesAndIcons && damageSubReasonNamesAndIcons.length) {
          this.damageSubReasonNamesAndIcons = damageSubReasonNamesAndIcons;
          console.log(this.damageSubReasonNamesAndIcons);
        } else {
          this.damageSubReasonForm.get('subReason').clearValidators(); // Disable validation
          this.damageSubReasonForm.get('subReason').updateValueAndValidity();
          this.damageSubReasonForm.patchValue({ subReason: null });
          this.goToNextStep();
        }
      },
      error => {
        console.error(error);
      }
    );



    this.store
      .select(fromRoot.selectDamageSubReasonGroupData)
      .pipe(take(1))
      .subscribe((damageSubReason: DamageSubReason) =>
        this.damageSubReasonForm.patchValue(damageSubReason, { emitEvent: false })
      );

    const subReason$ = this.subReasonCtrl.valueChanges.pipe(
      map((subReason: string) => ({ subReason } as Partial<DamageSubReason>))
    );

    merge(subReason$, of(null)).subscribe((payload: Partial<DamageSubReason>) => {
      this.store.dispatch(DamageSubReasonPageActions.patch({ payload }));
    });

    this.damageSubReasonForm.valueChanges
      .pipe(
        map(() => this.damageSubReasonForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(
          DamageSubReasonPageActions.changeValidationStatus({ isValid })
        )
      );
  }

  selectSubReason(reasonId: string) {
    this.selectedSubReason = reasonId;
    this.prospectApiService.setDamageSubReasonData(this.selectedSubReason);
  }


  goToNextStep() {
    if (this.damageSubReasonForm.invalid) {
      this.submitted = true;
      return;
    }

    this.router.navigate(['enter/property/damage_cause']);
  }

  goToPreviousStep() {
    this.router.navigate(['enter/property/damage_reason']);
  }
}
