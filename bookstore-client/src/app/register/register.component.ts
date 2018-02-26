import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordConfirmValidator} from './password.match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
      'passwordConfirm': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required]),
      'birthday': new FormControl('', [Validators.required]),
      'gender': new FormControl('', [Validators.required])
    }, {
      validator: PasswordConfirmValidator.matchPassword
    });
  }

  ngOnInit() {
  }

  onSubmit(form) {
    console.log('Submit is triggered');
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
