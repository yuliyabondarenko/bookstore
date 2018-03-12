import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from './service/auth.service ';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {
    // TODO authenticate with localStorage.authorizations
    // this.authService.authenticate
  }
}
