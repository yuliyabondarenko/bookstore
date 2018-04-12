import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterService } from './service/api/register.user.service';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminGuard } from './route.guard/admin-guard';
import { CustomerGuard } from './route.guard/customer-guard';
import { XhrInterceptor } from "./service/xhr-interceptor.service";
import { LoginService } from './service/api/login.service';
import { BooksPageService } from './service/api/page.service/books.page.service';
import { DataRestService } from './service/api/data.rest.service';


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
    DataRestService,
    BooksPageService,
    LoginService,
    XhrInterceptor,
    AdminGuard,
    CustomerGuard,
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
