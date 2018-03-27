import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { RegisterComponent } from './register/register.component';
import { UserService } from './service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BookService } from './service/book.service';
import { AuthService } from './service/auth.service ';
import { RegisterService } from './service/register.user.service';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
    BookService,
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
