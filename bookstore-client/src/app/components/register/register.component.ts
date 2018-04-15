import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordConfirmValidator } from './password.match.validator';
import { Router } from '@angular/router';
import { RegisterService } from '../../service/api/register.user.service';
import { User } from '../../entity/user';
import { SessionService } from '../../service/session.service';
import { LoginService } from '../../service/api/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  static registerUserFields = [
    'username',
    'email',
    'password',
    'gender',
    'birthday'
  ];

  registerForm: FormGroup;
  globalError: string;

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService,
              private loginService: LoginService,
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
    if(SessionService.isAuthorized) {
      this.loginService.logout();
    }
  }

  onSubmit(userForm) {
    const user: User = userForm.value;
    this.registerService.registerUser(user)
      .then(() => {
        alert('Registration successful! Please login');
        this.router.navigateByUrl('login');
      })
      .catch(error => {
        if (error.fieldErrors) {
          this.showValidationErrors(error.fieldErrors);
        } else {
          const errorMsg =  error && error.message ? error.message : '';
          this.globalError = `Registration failed. ${errorMsg}`;
        }
      });
  }

  showValidationErrors(fieldErrors: any) {
    const self = this;

    Object.keys(fieldErrors).forEach(fieldPath => {
      RegisterComponent.registerUserFields.forEach(function (field) {
        if (fieldPath.endsWith(field)) {
          self.setFieldError(field, fieldErrors[fieldPath])
        }
      });
    });
  }

  setFieldError(field: string, errorMessage: string): void {
    this.registerForm.get(field)
      .setErrors({incorrect: errorMessage});
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
