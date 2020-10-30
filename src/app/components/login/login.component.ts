import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {User} from '../../classes/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name: string;
  password: string;
  token;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(e) {
    const loginUser = {
      name: this.name,
      password: this.password
    };
    this.auth.loginUser(loginUser).subscribe(
      (response: any) => {
        if (response.data.token == null) {
          console.log(response.data);
          alert(response.data);
        } else {
          console.log(response);
          console.log('TOKEN', response.data.token);
          localStorage.setItem('auth_token', response.data.token);
          this.router.navigate(['form']);
        }
      }
    );

    e.target.reset();
  }
  onLogout() {
    this.auth.logoutUser();
  }

}
