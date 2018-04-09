import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordConfirmValidator} from './password.match.validator';
import {Router} from '@angular/router';
import { RegisterService } from '../../service/api/register.user.service';
import { User } from '../../entity/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  static formFields = [
    'username',
    'email',
    'password',
    'birthday',
    'gender'
  ];

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService,
              private router: Router) {
    this.registerForm = this.formBuilder.group({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
      'passwordConfirm': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required]),
      'birthday': new FormControl('',
        [Validators.required,
          Validators.pattern('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$')]),
      'gender': new FormControl('', [Validators.required])
    }, {
      validator: PasswordConfirmValidator.matchPassword
    });
  }

  ngOnInit() {
  }

  onSubmit(userForm) {
    const user: User = userForm.value;
    this.registerService.registerUser(user)
      .then(() => {
        alert('Registration successful! Please login');
        this.router.navigateByUrl('login');
      })
      .catch(errors => {
        this.showValidationErrors(errors);
      });
  }

  showValidationErrors(errors: any) {
    const self = this;

    Object.keys(errors.fieldErrors).forEach(fieldPath => {
      RegisterComponent.formFields.forEach(function (field) {
        if (fieldPath.endsWith(field)) {
          self.setFieldError(field, errors.fieldErrors[fieldPath])
        }
      });
    });
  }

  setFieldError(field: string, errorMessage: string): void {
    this.registerForm.get(field)
      .setErrors({server: errorMessage});
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get passwordConfirm() {
    return this.registerForm.get('passwordConfirm');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get birthday() {
    return this.registerForm.get('birthday');
  }

  get gender() {
    return this.registerForm.get('gender');
  }
}
