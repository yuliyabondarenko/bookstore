import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import {AppRoutingModule} from './/app-routing.module';
import {RegisterComponent} from './register/register.component';
import {UserService} from './service/user.service';
import {HttpClientModule} from '@angular/common/http';
import {BookComponent} from './book/book.component';
import {BookService} from './service/book.service';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [UserService, BookService],
  bootstrap: [AppComponent]
})
export class AppModule {}
