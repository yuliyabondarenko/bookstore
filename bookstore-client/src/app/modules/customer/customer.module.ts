import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { OrdersComponent } from './orders/orders.component';
import { BooksComponent } from './books/books.component';
import { BookPriceCountComponent } from './book-price-count/book-price-count.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartService } from '../../service/api/shopping.cart.service';
import { BookCardComponent } from './book-card/book-card.component';
import { LocalShoppingCartService } from '../../service/local-shopping-cart.service';
import { OrdersPageService } from '../../service/api/page.service/orders.page.service';
import { CustomerGuard } from '../../route.guard/customer-guard';
import { CustomerComponent } from './customer.component';


const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    canActivate: [CustomerGuard],
    children: [
      {
        path: 'profile',
        loadChildren: 'app/modules/user-profile/user-profile.module#UserProfileModule'
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
    CustomerComponent,
    OrdersComponent,
    BooksComponent,
    BookPriceCountComponent,
    ShoppingCartComponent,
    BookCardComponent
  ],
  providers: [
    OrdersPageService,
    ShoppingCartService,
    LocalShoppingCartService
  ]
})
export class CustomerModule {
}
