import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../core/state';
import {DamageMainReason} from '../core/interfaces/damage-main-reason.interface';
import {distinctUntilChanged, map, take} from 'rxjs/operators';
import {DamageMainReasonPageActions} from './actions';
import {merge} from 'rxjs';
import {ProspectApiService} from '../../../../_services';
import {ProductActivity} from '../core/interfaces/product-activity.interface';
import {ProductActivityPageActions} from '../product-activity/actions';

@Component({
  selector: 'app-damage-main-reason',
  templateUrl: './damage-main-reason.component.html',
})
export class DamageMainReasonComponent implements OnInit {
  title = 'Damage Main Reason';
  public current = 0;

  public steps = [
    { label: 'Damage Main Reason', icon: 'user' },
    { label: 'Damage Reason', icon: 'book' },
    { label: 'Damage Sub-Reason', icon: 'paperclip'},
    { label: 'Damage Cause', icon: 'file-add' },
    { label: 'Damage Additional Information', icon: 'file-add' },
  ];
  damageMainReasonNamesAndIcons: { name: string, icon: string, id: string }[] = [];

  public selectedMainReason = '';
  damageMainReasonForm = this.fb.group(
    {
      mainReason: [null, [Validators.required]],
    },
    {
      updateOn: 'blur'
    }
  );
  mainReasonCtrl = this.damageMainReasonForm.get('mainReason');
  submitted = false;

  constructor(
    private prospectApiService: ProspectApiService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.prospectApiService.loadDamageMainReasonsNamesAndIcons().subscribe(
      damageMainReasonNamesAndIcons => {
        this.damageMainReasonNamesAndIcons = damageMainReasonNamesAndIcons;
        console.log(this.damageMainReasonNamesAndIcons);
      },
      error => {
        console.error(error);
      }
    );

    this.store
      .select(fromRoot.selectDamageMainReasonGroupData)
      .pipe(take(1))
      .subscribe((damageMainReason: DamageMainReason) =>
        this.damageMainReasonForm.patchValue(damageMainReason, { emitEvent: false })
      );

    const mainReason$ = this.mainReasonCtrl.valueChanges.pipe(
      map((mainReason: string) => ({ mainReason } as Partial<DamageMainReason>))
    );


    merge(mainReason$).subscribe(
      (payload: Partial<DamageMainReason>) => {
        this.store.dispatch(DamageMainReasonPageActions.patch({ payload }));
      }
    );

    this.damageMainReasonForm.valueChanges
      .pipe(
        map(() => this.damageMainReasonForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(
          DamageMainReasonPageActions.changeValidationStatus({ isValid })
        )
      );
  }
  selectMainReason(mainReasonId: string) {
    this.selectedMainReason = mainReasonId;
    this.prospectApiService.setDamageMainReasonData(this.selectedMainReason);
  }

  goToNextStep() {
    if (this.damageMainReasonForm.invalid) {
      this.submitted = true;
      return;
    }

    this.router.navigate(['enter/property/damage_reason']);
  }

  goToPreviousStep() {
    this.router.navigate(['enter/property/subObject']);
  }
}
