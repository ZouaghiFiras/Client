/* tslint:disable:ban-types */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../core/state';
import {Object} from '../core/interfaces/object.interface';
import {distinctUntilChanged, map, take} from 'rxjs/operators';
import {ObjectPageActions} from './actions';
import {merge} from 'rxjs';
import {ProspectApiService} from '../../../../_services';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
})
export class ObjectComponent implements OnInit {
  title = 'Object';
  intakeObjects: any = {
    identifiedProducts: [],
    insuranceObjects: []
  };
  intakeSubCoverages: any = {
    identifiedProducts: [],
    subCoverages: []
  };
  intakePolicyDuration: any;
  conditionList: any;
  buildingUseList: any;
  activityOptionsList: any;

  objectForm = this.fb.group(
    {
      mainObject: [null],
      object: [null],
      subObject: [null],
      locatedAtPartyAddress: [null],
      party: [null],
      damageLocation: [null],
      coverage: [null],
      policyNumber: [null],
      deductibleExcess: [null],
      insuredAmount: [null],
      policyConditions: [null],
      deedOfAssignment: [null],
      startDateKnown: [false],
      policyDuration: [null],
      guaranteeAgainstUnderinsurance: [true],
      includingExcludingVAT: ['ex'],
    },
    {
      updateOn: 'blur'
    }
  );
  mainObjectCtrl = this.objectForm.get('mainObject');
  objectCtrl = this.objectForm.get('object');
  subObjectCtrl = this.objectForm.get('subObject');
  locatedAtPartyAddressCtrl = this.objectForm.get('locatedAtPartyAddress');
  partyCtrl = this.objectForm.get('party');
  damageLocationCtrl = this.objectForm.get('damageLocation');
  coverageCtrl = this.objectForm.get('coverage');
  policyNumberCtrl = this.objectForm.get('policyNumber');
  deductibleExcessCtrl = this.objectForm.get('deductibleExcess');
  insuredAmountCtrl = this.objectForm.get('insuredAmount');
  policyConditionsCtrl = this.objectForm.get('policyConditions');
  deedOfAssignmentCtrl = this.objectForm.get('deedOfAssignment');
  startDateKnownCtrl = this.objectForm.get('startDateKnown');
  policyDurationCtrl = this.objectForm.get('policyDuration');
  guaranteeAgainstUnderinsuranceCtrl = this.objectForm.get('guaranteeAgainstUnderinsurance');
  includingExcludingVATCtrl = this.objectForm.get('includingExcludingVAT');
  submitted = false;

  constructor(
    private prospectApiService: ProspectApiService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.prospectApiService.getIntakeObjects().subscribe(
      data => {
        console.log(data);
        this.intakeObjects = data;
      },
      error => {
        console.error(error);
      }
    );
    this.prospectApiService.getIntakeSubCoverages().subscribe(
      data => {
        console.log(data);
        this.intakeSubCoverages = data;
      },
      error => {
        console.error(error);
      }
    );
    this.prospectApiService.getPolicyDuration().subscribe(
      data => {
        console.log(data);
        this.intakePolicyDuration = data;
      },
      error => {
        console.error(error);
      }
    );
    this.prospectApiService.getConditionList().subscribe(
      data => {
        console.log(data);
        this.conditionList = data;
      },
      error => {
        console.error(error);
      }
    );
    this.prospectApiService.getBuildingUseList().subscribe(
      data => {
        console.log(data);
        this.buildingUseList = data;
      },
      error => {
        console.error(error);
      }
    );
    this.prospectApiService.getActivityOptionsList().subscribe(
      data => {
        console.log(data);
        this.activityOptionsList = data;
      },
      error => {
        console.error(error);
      }
    );
    this.store
      .select(fromRoot.selectObjectGroupData)
      .pipe(take(1))
      .subscribe((object: Object) =>
        this.objectForm.patchValue(object, { emitEvent: false })
      );

    const mainObject$ = this.mainObjectCtrl.valueChanges.pipe(
      map((mainObject: string) => ({ mainObject } as Partial<Object>))
    );
    const object$ = this.objectCtrl.valueChanges.pipe(
      map((object: string) => ({ object } as Partial<Object>))
    );
    const subObject$ = this.subObjectCtrl.valueChanges.pipe(
      map((subObject: string) => ({ subObject } as Partial<Object>))
    );
    const locatedAtPartyAddress$ = this.locatedAtPartyAddressCtrl.valueChanges.pipe(
      map((locatedAtPartyAddress: string) => ({ locatedAtPartyAddress } as Partial<Object>))
    );
    const party$ = this.partyCtrl.valueChanges.pipe(
      map((party: string) => ({ party } as Partial<Object>))
    );
    const damageLocation$ = this.damageLocationCtrl.valueChanges.pipe(
      map((damageLocation: string) => ({ damageLocation } as Partial<Object>))
    );
    const coverage$ = this.coverageCtrl.valueChanges.pipe(
      map((coverage: string) => ({ coverage } as Partial<Object>))
    );
    const policyNumber$ = this.policyNumberCtrl.valueChanges.pipe(
      map((policyNumber: string) => ({ policyNumber } as Partial<Object>))
    );
    const deductibleExcess$ = this.deductibleExcessCtrl.valueChanges.pipe(
      map((deductibleExcess: string) => ({ deductibleExcess } as Partial<Object>))
    );
    const insuredAmount$ = this.insuredAmountCtrl.valueChanges.pipe(
      map((insuredAmount: string) => ({ insuredAmount } as Partial<Object>))
    );
    const policyConditions$ = this.policyConditionsCtrl.valueChanges.pipe(
      map((policyConditions: string) => ({ policyConditions } as Partial<Object>))
    );
    const deedOfAssignment$ = this.deedOfAssignmentCtrl.valueChanges.pipe(
      map((deedOfAssignment: string) => ({ deedOfAssignment } as Partial<Object>))
    );
    const startDateKnown$ = this.startDateKnownCtrl.valueChanges.pipe(
      map((startDateKnown: boolean) => ({ startDateKnown } as Partial<Object>))
    );
    const policyDuration$ = this.policyDurationCtrl.valueChanges.pipe(
      map((policyDuration: string) => ({ policyDuration } as Partial<Object>))
    );
    const guaranteeAgainstUnderinsurance$ = this.guaranteeAgainstUnderinsuranceCtrl.valueChanges.pipe(
      map((guaranteeAgainstUnderinsurance: boolean) => ({ guaranteeAgainstUnderinsurance } as Partial<Object>))
    );
    const includingExcludingVAT$ = this.includingExcludingVATCtrl.valueChanges.pipe(
      map((includingExcludingVAT: string) => ({ includingExcludingVAT } as Partial<Object>))
    );

    merge(
      mainObject$,
      object$,
      subObject$,
      locatedAtPartyAddress$,
      party$,
      damageLocation$,
      coverage$,
      policyNumber$,
      deductibleExcess$,
      insuredAmount$,
      policyConditions$,
      deedOfAssignment$,
      startDateKnown$,
      policyDuration$,
      guaranteeAgainstUnderinsurance$,
      includingExcludingVAT$
    )
      .pipe(distinctUntilChanged())
      .subscribe(
        (payload: Partial<Object>) => {
          this.store.dispatch(ObjectPageActions.patch({ payload }));
        });
    this.objectForm.valueChanges
      .pipe(
        map(() => this.objectForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(
          ObjectPageActions.changeValidationStatus({ isValid })
        )
      );
  }

  goToNextStep() {
    if (this.objectForm.invalid) {
      this.submitted = true;
      return;
    }

    this.router.navigate(['enter/property/damage_main_reason']);
  }

  goToPreviousStep() {
    this.router.navigate(['enter/property/parties']);
  }
}

