import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { UserService } from './service/api/user.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BookService } from './service/api/book.service';
import { RegisterService } from './service/api/register.user.service';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminGuard } from './service/admin-guard.service';
import { UserGuard } from './service/user-guard.service';
import { OrderService } from './service/api/order.service';
import {XhrInterceptor} from "./service/xhr-interceptor.service";
import { LoginService } from './service/api/login.service';
import { SessionService } from './service/session.service';


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
  ],
  providers: [
    LoginService,
    SessionService,
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
