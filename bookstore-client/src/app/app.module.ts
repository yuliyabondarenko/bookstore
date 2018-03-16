import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import {AppRoutingModule} from './/app-routing.module';
import {RegisterComponent} from './register/register.component';
import {UserService} from './service/user.service';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {BookComponent} from './book/book.component';
import {BookService} from './service/book.service';
import {AuthService} from './service/auth.service ';
import {RegisterService} from './service/register.user.service';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    UserService,
    AuthService,
    BookService,
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
