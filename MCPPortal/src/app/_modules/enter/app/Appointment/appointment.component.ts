import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../core/state';
import {distinctUntilChanged, map, take} from 'rxjs/operators';
import {Appointment} from '../core/interfaces/appointment.interface';
import {AppointmentPageActions} from './actions';
import {merge} from 'rxjs';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
})
export class AppointmentComponent implements OnInit {
  title = 'Appointment';
  appointmentForm = this.fb.group(
    {
      appointmentType: [null, [Validators.required]],
      contactPerson: [null, [Validators.required]],
    },
    {
      updateOn: 'blur'
    }
  );
  appointmentTypeCtrl = this.appointmentForm.get('appointmentType');
  contactPersonCtrl = this.appointmentForm.get('contactPerson');
  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.store
      .select(fromRoot.selectAppointmentGroupData)
      .pipe(take(1))
      .subscribe((appointment: Appointment) =>
        this.appointmentForm.patchValue(appointment, { emitEvent: false })
      );

    const appointmentType$ = this.appointmentTypeCtrl.valueChanges.pipe(
      map((appointmentType: string) => ({ appointmentType } as Partial<Appointment>))
    );

    const contactPerson$ = this.contactPersonCtrl.valueChanges.pipe(
      map((contactPerson: string) => ({ contactPerson } as Partial<Appointment>))
    );

    merge(appointmentType$, contactPerson$).subscribe(
      (payload: Partial<Appointment>) => {
        this.store.dispatch(AppointmentPageActions.patch({ payload }));
      }
    );

    this.appointmentForm.valueChanges
      .pipe(
        map(() => this.appointmentForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(
          AppointmentPageActions.changeValidationStatus({ isValid })
        )
      );
  }

  goToPreviousStep() {
    this.router.navigate(['additional']);
  }

  goToNextStep() {
    if (this.appointmentForm.invalid) {
      this.submitted = true;
      return;
    }
    this.router.navigate(['enter/property/summary']);
    console.log('we are done');
  }
}
