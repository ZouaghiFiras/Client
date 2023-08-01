import {FormGroup, ValidatorFn} from '@angular/forms';
import {Extensions} from './extensions';

export class FormExtensions {

  constructor() {
  }

  // Form Helper
  public static getValue(form: FormGroup, controlName: string) {
    return form.get(controlName).value;
  }

  public static setValidator(form: FormGroup, controlName: string, validators: ValidatorFn | ValidatorFn[]) {
    form.get(controlName).setValidators(validators);
    form.get(controlName).updateValueAndValidity();
  }

  public static clearValidator(form: FormGroup, controlName: string) {
    form.get(controlName).clearValidators();
    form.get(controlName).updateValueAndValidity();
  }

  public static setValue(form: FormGroup, controlName: string, value) {
    form.controls[controlName].setValue(value);
    form.get(controlName).updateValueAndValidity();
  }

  public static resetValue(form: FormGroup, controlName: string) {
    form.controls[controlName].reset();
    form.get(controlName).updateValueAndValidity();
  }

  public static disableControl(form: FormGroup, controlName: string) {
    form.get(controlName).disable();
    form.get(controlName).updateValueAndValidity();
  }

  public static enbaleControl(form: FormGroup, controlName: string) {
    form.get(controlName).enable();
    form.get(controlName).updateValueAndValidity();
  }

  public static isStringControlNullOrEmpty(form: FormGroup, controlName: string) {
    return Extensions.isStringNullOrEmpty(form.controls[controlName].value);
  }

}
