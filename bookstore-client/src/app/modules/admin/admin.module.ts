import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { AdminGuard } from '../../route.guard/admin-guard';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { BookFormDialogComponent } from './manage-books/book.form/book.form';
import { UsersPageService } from '../../service/api/page.service/users.page.service';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'profile',
        loadChildren: 'app/modules/user-profile/user-profile.module#UserProfileModule'
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
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AdminComponent,
    ManageUsersComponent,
    ManageBooksComponent,
    BookFormDialogComponent
  ],
  providers: [
    UsersPageService
  ],
  entryComponents: [BookFormDialogComponent]
})
export class AdminModule {
}

