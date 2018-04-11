import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../service/api/user.service';
import { User } from '../../../entity/user';
import { LinkHelper } from '../../../service/link.helper';
import { SessionService } from '../../../service/session.service';
import { ErrorStateMatcher } from '@angular/material';

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

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser(LinkHelper.getUserLink(SessionService.userId))
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
    this.userService.updateUser(this.user._links.self.href, user)
      .then(user => this.initUser(user))
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
