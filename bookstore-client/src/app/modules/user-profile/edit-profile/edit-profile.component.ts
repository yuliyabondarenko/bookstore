import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../entity/user';
import { ErrorStateMatcher } from '@angular/material';
import { UserAccountService } from "../../../service/api/user.account.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: User = new User();
  userInitial: User;
  @ViewChild('userForm') userForm: HTMLFormElement;
  matcher: ErrorStateMatcher;
  globalError: string;

  constructor(private userAccountService: UserAccountService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userAccountService.getUserAccount()
      .then(user => this.initUser(user))
  }

  initUser(user: User) {
    this.user = user;
    this.userInitial = Object.assign({}, user);
  }

  reset() {
    this.user = Object.assign({}, this.userInitial);
  }

  save(user: User) {
    this.userAccountService.update(user)
      .then(user => {
        //TODO НУЖНО ввести пароль если менять email
        this.initUser(user);
      })
      .catch(error => {
        if (error.fieldErrors) {
          this.showValidationErrors(error.fieldErrors);
        } else {
          this.globalError = 'Update profile failed';
        }
      });
  }

  showValidationErrors( fieldErrors: any) {
    const self = this;

    Object.keys(fieldErrors).forEach(fieldPath => {
      Object.keys(this.userForm.controls).forEach(function (field) {
        if (fieldPath.endsWith(field)) {
          self.setFieldError(field, fieldErrors[fieldPath])
        }
      });
    });
  }

  setFieldError(field: string, errorMessage: string): void {
    this.userForm.controls[field].setErrors({incorrect: errorMessage});
  }

}
