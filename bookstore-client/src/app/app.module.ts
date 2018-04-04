import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { UserService } from './service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BookService } from './service/book.service';
import { RegisterService } from './service/register.user.service';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminGuard } from './service/admin-guard.service';
import { AuthService } from './service/auth.service ';
import { UserGuard } from './service/user-guard.service';
import {XhrInterceptor} from "./service/xhr-interceptor.service";


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
    UserService,
    AuthService,
    XhrInterceptor,
    AdminGuard,
    UserGuard,
    BookService,
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
