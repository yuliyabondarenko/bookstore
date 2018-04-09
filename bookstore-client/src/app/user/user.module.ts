import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { OrdersComponent } from './orders/orders.component';
import { BooksComponent } from './books/books.component';
import { UserGuard } from '../service/user-guard.service';
import { BookPriceCountComponent } from './book-price-count/book-price-count.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartService } from '../service/shopping.cart.service';
import { BookCardComponent } from '../book-card/book-card.component';
import { LocalShoppingCartService } from '../service/local-shopping-cart.service';


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
      },
      {
        path: 'shopcart',
        component: ShoppingCartComponent,
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
    BooksComponent,
    BookPriceCountComponent,
    ShoppingCartComponent,
    BookCardComponent
  ],
  providers: [
    ShoppingCartService,
    LocalShoppingCartService
  ]
})
export class UserModule {
}
