import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { OrdersComponent } from './orders/orders.component';
import { BooksComponent } from './books/books.component';
import { UserGuard } from '../service/user-guard.service';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [UserGuard],
    children: [
      {
        path: 'profile',
        loadChildren: 'app/user-profile/user-profile.module#UserProfileModule'
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
