import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageBooksComponent } from './manage-books/manage-books.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
       {
         path: 'profile',
         loadChildren: 'app/user-profile/user-profile.module#UserProfileModule'
       },
      {
        path: 'users',
        component: ManageUsersComponent,
      },
      {
        path: 'books',
        component: ManageBooksComponent,
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
  declarations: [
    AdminComponent,
    ManageUsersComponent,
    ManageBooksComponent
  ]
})
export class AdminModule {
}

