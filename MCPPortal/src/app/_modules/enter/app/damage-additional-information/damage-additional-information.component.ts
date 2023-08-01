import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../core/state';
import {DamageAdditionalInformation} from '../core/interfaces/damage-additional-information.interface';
import {distinctUntilChanged, map, take} from 'rxjs/operators';
import {DamageAdditionalInformationPageActions} from './actions';
import {merge} from 'rxjs';

@Component({
  selector: 'app-damage-additional-information',
  templateUrl: './damage-additional-information.component.html',
})
export class DamageAdditionalInformationComponent implements OnInit {
  title = 'Damage Additional Information';
  public current = 4;

  public steps = [
    { label: 'Damage Main Reason', icon: 'user' },
    { label: 'Damage Reason', icon: 'book' },
    { label: 'Damage Sub-Reason', icon: 'paperclip' },
    { label: 'Damage Cause', icon: 'file-add' },
    { label: 'Damage Additional Information', icon: 'file-add' },
  ];
  damageAdditionalInformationForm = this.fb.group({caseNumber: [null],
    orderNumber: [null],
    rightOfRecovery: [false],
    estimatedDamageAmount: [null],
    damageDateUnknown: [false],
    damageDate: [null],
    additionalExplanation: [null]
  });

  caseNumberCtrl = this.damageAdditionalInformationForm.get('caseNumber');
  orderNumberCtrl = this.damageAdditionalInformationForm.get('orderNumber');
  rightOfRecoveryCtrl = this.damageAdditionalInformationForm.get('rightOfRecovery');
  estimatedDamageAmountCtrl = this.damageAdditionalInformationForm.get('estimatedDamageAmount');
  damageDateUnknownCtrl = this.damageAdditionalInformationForm.get('damageDateUnknown');
  damageDateCtrl = this.damageAdditionalInformationForm.get('damageDate');
  additionalExplanationCtrl = this.damageAdditionalInformationForm.get('additionalExplanation');

  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.store
      .select(fromRoot.selectDamageAdditionalInformationGroupData)
      .pipe(take(1))
      .subscribe((damageAdditionalInformation: DamageAdditionalInformation) => {
        this.damageAdditionalInformationForm.patchValue(damageAdditionalInformation, { emitEvent: false });
      });
    const caseNumber$ = this.caseNumberCtrl.valueChanges.pipe(
      map((caseNumber: string) => ({ caseNumber } as Partial<DamageAdditionalInformation>))
    );

    const orderNumber$ = this.orderNumberCtrl.valueChanges.pipe(
      map((orderNumber: string) => ({ orderNumber } as Partial<DamageAdditionalInformation>))
    );

    const rightOfRecovery$ = this.rightOfRecoveryCtrl.valueChanges.pipe(
      map((rightOfRecovery: boolean) => ({ rightOfRecovery } as Partial<DamageAdditionalInformation>))
    );

    const estimatedDamageAmount$ = this.estimatedDamageAmountCtrl.valueChanges.pipe(
      map((estimatedDamageAmount: string) => ({ estimatedDamageAmount } as Partial<DamageAdditionalInformation>))
    );

    const damageDateUnknown$ = this.damageDateUnknownCtrl.valueChanges.pipe(
      map((damageDateUnknown: boolean) => ({ damageDateUnknown } as Partial<DamageAdditionalInformation>))
    );

    const damageDate$ = this.damageDateCtrl.valueChanges.pipe(
      map((damageDate: Date) => ({ damageDate } as Partial<DamageAdditionalInformation>))
    );

    const additionalExplanation$ = this.additionalExplanationCtrl.valueChanges.pipe(
      map((additionalExplanation: string) => ({ additionalExplanation } as Partial<DamageAdditionalInformation>))
    );

    merge(
      caseNumber$,
      orderNumber$,
      rightOfRecovery$,
      estimatedDamageAmount$,
      damageDateUnknown$,
      damageDate$,
      additionalExplanation$
    ).subscribe((payload: Partial<DamageAdditionalInformation>) => {
      this.store.dispatch(DamageAdditionalInformationPageActions.patch({ payload }));
    });

    this.damageAdditionalInformationForm.valueChanges
      .pipe(
        map(() => this.damageAdditionalInformationForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(
          DamageAdditionalInformationPageActions.changeValidationStatus({ isValid })
        )
      );
  }

  goToNextStep() {
    if (this.damageAdditionalInformationForm.invalid) {
      this.submitted = true;
      return;
    }

    this.router.navigate(['enter/property/additional_questions']);
  }

  goToPreviousStep() {
    this.router.navigate(['enter/property/damage_cause']);
  }
}
