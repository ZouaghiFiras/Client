import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../core/state';
import {ReporterInformationPageActions} from './actions';
import {distinctUntilChanged, map, take} from 'rxjs/operators';
import {merge} from 'rxjs';
import {ReporterInformation} from '../core/interfaces/reporter-information.interface';
import {ProspectApiService} from '../../../../_services';

@Component({
  selector: 'app-reporter-information',
  templateUrl: './reporter-information.component.html',
})
export class ReporterInformationComponent implements OnInit {
  title = 'Reporter Information';
  public current = 1;

  public steps = [
    { label: 'Reporter Selection', icon: 'user' },
    { label: 'Reporter Information', icon: 'book' },
  ];
  optionsData: any;
  salutationData: any;
  reporterInformationForm = this.fb.group({
    contactMethod: [null, [Validators.required]],
    salutation: [null, [Validators.required]],
    firstName: [null, [Validators.required]],
    prefix: [null],
    lastName: [null, [Validators.required]],
    email: [null, [Validators.required]],
    phoneNumber: [null, [Validators.required]],
  });
  contactMethodCtrl = this.reporterInformationForm.get('contactMethod');
  salutationCtrl = this.reporterInformationForm.get('salutation');
  firstNameCtrl = this.reporterInformationForm.get('firstName');
  prefixCtrl = this.reporterInformationForm.get('prefix');
  lastNameCtrl = this.reporterInformationForm.get('lastName');
  emailCtrl = this.reporterInformationForm.get('email');
  phoneNumberCtrl = this.reporterInformationForm.get('phoneNumber');

  submitted = false;
  private selectedWayOfContact: string;

  constructor(
    private prospectApiService: ProspectApiService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.loadSalutationData();
    this.loadContactMethodOptionsData();
    this.store
      .select(fromRoot.selectReporterInformationGroupData)
      .pipe(take(1))
      .subscribe((reporter: ReporterInformation) =>
        this.reporterInformationForm.patchValue(reporter, { emitEvent: false })
      );
    const contactMethod$ = this.contactMethodCtrl.valueChanges.pipe(
      map((contactMethod: string) => ({ contactMethod } as Partial<ReporterInformation>))
    );

    const salutation$ = this.salutationCtrl.valueChanges.pipe(
      map((salutation: string) => ({ salutation } as Partial<ReporterInformation>))
    );

    const firstName$ = this.firstNameCtrl.valueChanges.pipe(
      map((firstName: string) => ({ firstName } as Partial<ReporterInformation>))
    );

    const prefix$ = this.prefixCtrl.valueChanges.pipe(
      map((prefix: string) => ({ prefix } as Partial<ReporterInformation>))
    );

    const lastName$ = this.lastNameCtrl.valueChanges.pipe(
      map((lastName: string) => ({ lastName } as Partial<ReporterInformation>))
    );

    const email$ = this.emailCtrl.valueChanges.pipe(
      map((email: string) => ({ email } as Partial<ReporterInformation>))
    );

    const phoneNumber$ = this.phoneNumberCtrl.valueChanges.pipe(
      map((phoneNumber: string) => ({ phoneNumber } as Partial<ReporterInformation>))
    );


    merge(contactMethod$, salutation$, firstName$, prefix$, lastName$, email$, phoneNumber$).subscribe(
      (payload: Partial<ReporterInformation>) => {
        this.store.dispatch(ReporterInformationPageActions.patch({ payload }));
      }
    );

    this.reporterInformationForm.valueChanges
      .pipe(
        map(() => this.reporterInformationForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(
          ReporterInformationPageActions.changeValidationStatus({ isValid })
        )
      );
  }
  loadSalutationData() {
    this.prospectApiService.getSalutation().subscribe(
      (data: any) => {
        this.salutationData = data;
        // Perform any necessary actions with the loaded data here
        console.log(this.salutationData);
      },
      (error: any) => {
        console.error('Failed to fetch salutation data:', error);
      }
    );
  }

  loadContactMethodOptionsData() {
    this.prospectApiService.getContactMethods().subscribe(
      (data: any) => {
        this.optionsData = data;
        // Perform any necessary actions with the loaded data here
        console.log(this.optionsData);
      },
      (error: any) => {
        console.error('Failed to fetch options data:', error);
      }
    );
  }
  selectWayOfContact(wayOfContactId: string) {
    this.selectedWayOfContact = wayOfContactId;
    this.prospectApiService.setReporterWayOfContactData(this.selectedWayOfContact);
  }
  goToNextStep() {
    if (this.reporterInformationForm.invalid) {
      this.submitted = true;
      console.log('no');
      return;
    }

    this.router.navigate(['enter/property/product_activity']);
  }

  goToPreviousStep() {
    this.router.navigate(['enter/property/reporter_selection']);
  }
}
