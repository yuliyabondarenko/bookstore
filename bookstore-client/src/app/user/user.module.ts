import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from "../profile/profile.component";
import { MaterialModule } from '../material.module';
import { OrdersComponent } from './orders/orders.component';
import { BooksComponent } from './books/books.component';


const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'books',
        component: BooksComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
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
    UserComponent,
    OrdersComponent,
    BooksComponent
  ]
})
export class UserModule {
}
