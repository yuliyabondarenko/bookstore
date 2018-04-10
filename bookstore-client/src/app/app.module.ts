import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { UserService } from './service/api/user.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BookService } from './service/api/book.service';
import { RegisterService } from './service/api/register.user.service';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminGuard } from './service/admin-guard.service';
import { UserGuard } from './service/user-guard.service';
import { OrderService } from './service/api/order.service';
import { XhrInterceptor } from "./service/xhr-interceptor.service";
import { LoginService } from './service/api/login.service';
import { BooksPageService } from './service/api/page.service/books.page.service';
import { OrdersPageService } from './service/api/page.service/orders.page.service';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    BooksPageService,
    OrdersPageService,
    LoginService,
    UserService,
    XhrInterceptor,
    AdminGuard,
    UserGuard,
    BookService,
    OrderService,
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
