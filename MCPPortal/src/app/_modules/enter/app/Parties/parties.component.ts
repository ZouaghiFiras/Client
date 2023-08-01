import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../core/state';
import {Party} from '../core/interfaces/parties.interface';
import {distinctUntilChanged, map, take} from 'rxjs/operators';
import {PartiesPageActions} from './actions';
import {merge} from 'rxjs';
import {ProspectApiService} from '../../../../_services';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
})
export class PartiesComponent implements OnInit {
  title = 'Party';
  countries: any;
  partiesForm = this.fb.group(
    {
      partyType: [null, [Validators.required]],
      partyRole: [null, [Validators.required]],
      country: [null, [Validators.required]],
      postalCode: [null, [Validators.required]],
      houseNumber: [null, [Validators.required]],
      suffix: [null],
      street: [null, [Validators.required]],
      city: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone1: [null, [Validators.required]],
      phone2: [null],
      phone3: [null],
    },
    {
      updateOn: 'blur'
    }
  );
  partyTypeCtrl = this.partiesForm.get('partyType');
  partyRoleCtrl = this.partiesForm.get('partyRole');
  countryCtrl = this.partiesForm.get('country');
  postalCodeCtrl = this.partiesForm.get('postalCode');
  houseNumberCtrl = this.partiesForm.get('houseNumber');
  suffixCtrl = this.partiesForm.get('suffix');
  streetCtrl = this.partiesForm.get('street');
  cityCtrl = this.partiesForm.get('city');
  emailCtrl = this.partiesForm.get('email');
  phone1Ctrl = this.partiesForm.get('phone1');
  phone2Ctrl = this.partiesForm.get('phone2');
  phone3Ctrl = this.partiesForm.get('phone3');
  submitted = false;
  partyRoles: any;

  constructor(
    private prospectApiService: ProspectApiService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.prospectApiService.getRoleCodes().subscribe(
      data => {
        this.partyRoles = data;
        console.log(this.partyRoles);
      },
      error => {
        console.error(error);
      }
    );
    this.prospectApiService.getCountries().subscribe(
      coutries => {
        this.countries = coutries.value;
        console.log(this.countries);
      },
      error => {
        console.error(error);
      }
    );
    this.store
      .select(fromRoot.selectPartyGroupData)
      .pipe(take(1))
      .subscribe((party: Party) =>
        this.partiesForm.patchValue(party, { emitEvent: false })
      );

    const partyType$ = this.partyTypeCtrl.valueChanges.pipe(
      map((partyType: string) => ({ partyType } as Partial<Party>))
    );
    const partyRole$ = this.partyRoleCtrl.valueChanges.pipe(
      map((partyRole: string) => ({ partyRole } as Partial<Party>))
    );
    const country$ = this.countryCtrl.valueChanges.pipe(
      map((country: string) => ({ country } as Partial<Party>))
    );
    const postalCode$ = this.postalCodeCtrl.valueChanges.pipe(
      map((postalCode: string) => ({ postalCode } as Partial<Party>))
    );
    const houseNumber$ = this.houseNumberCtrl.valueChanges.pipe(
      map((houseNumber: string) => ({ houseNumber } as Partial<Party>))
    );
    const suffix$ = this.suffixCtrl.valueChanges.pipe(
      map((suffix: string) => ({ suffix } as Partial<Party>))
    );
    const street$ = this.streetCtrl.valueChanges.pipe(
      map((street: string) => ({ street } as Partial<Party>))
    );
    const city$ = this.cityCtrl.valueChanges.pipe(
      map((city: string) => ({ city } as Partial<Party>))
    );
    const email$ = this.emailCtrl.valueChanges.pipe(
      map((email: string) => ({ email } as Partial<Party>))
    );
    const phone1$ = this.phone1Ctrl.valueChanges.pipe(
      map((phone1: string) => ({ phone1 } as Partial<Party>))
    );
    const phone2$ = this.phone2Ctrl.valueChanges.pipe(
      map((phone2: string) => ({ phone2 } as Partial<Party>))
    );
    const phone3$ = this.phone3Ctrl.valueChanges.pipe(
      map((phone3: string) => ({ phone3 } as Partial<Party>))
    );

    merge(
      partyType$, partyRole$, country$, postalCode$, houseNumber$, suffix$,
      street$, city$, email$, phone1$, phone2$, phone3$
    ).subscribe((payload: Partial<Party>) => {
      this.store.dispatch(PartiesPageActions.patch({ payload }));
    });

    this.partiesForm.valueChanges
      .pipe(
        map(() => this.partiesForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(
          PartiesPageActions.changeValidationStatus({ isValid })
        )
      );
  }

  goToNextStep() {
    if (this.partiesForm.invalid) {
      this.submitted = true;
      return;
    }

    this.router.navigate(['enter/property/object']);
  }

  goToPreviousStep() {
    this.router.navigate(['enter/property/product_sub_object']);
  }

  addItem(): void {
    const party: Party = this.partiesForm.value.controls;
    this.store.dispatch(PartiesPageActions.addParty({party}));
    this.store.select(fromRoot.selectPartiesGroupData).subscribe(data => {
      console.log(data);
    });
    this.partiesForm.reset();
    this.submitted = false ;
    this.router.navigate(['enter/property/parties']);
  }

}
