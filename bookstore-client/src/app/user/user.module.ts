import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from "../profile/profile.component";
import { MaterialModule } from '../material.module';


const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserComponent]
})
export class UserModule { }
