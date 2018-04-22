import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { UserAccountService } from "../../service/api/user.account.service";

const routes: Routes = [
  {
    path: '',
    component: EditProfileComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditProfileComponent],
  providers: [UserAccountService]
})
export class UserProfileModule { }
