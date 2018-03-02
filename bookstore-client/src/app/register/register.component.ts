import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordConfirmValidator} from './password.match.validator';
import {User} from '../entity/user';
import {RegisterService} from '../service/register.user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService) {
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
        alert('Registration successful!');
      })
      .catch(errors => {
        alert('Registration failed!');
        this.showValidationErrors(errors);
      });
  }

  showValidationErrors(errors: any) {
    //TODO Should be automized
    if (errors.username) {
      this.registerForm.get('username').setErrors({server: errors.username});
    }
    if (errors.email) {
      this.registerForm.get('email').setErrors({server: errors.email});
    }
    if (errors.password) {
      this.registerForm.get('password').setErrors({server: errors.password});
    }
    if (errors.birthday) {
      this.registerForm.get('birthday').setErrors({server: errors.birthday});
    }
    if (errors.gender) {
      this.registerForm.get('gender').setErrors({server: errors.gender});
    }
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
