import {FormGroup} from '@angular/forms';

export class PasswordConfirmValidator {

  static matchPassword(control: FormGroup) {
    const password = control.get('password').value;
    const confirmPassword = control.get('passwordConfirm').value;

    if ( password !== confirmPassword ) {
      control.get('passwordConfirm').setErrors({mismatch: true});
    }
  }
}
