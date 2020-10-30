import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {User} from '../../classes/User';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name: string;
  password: string;
  loginUser: User;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }


  onLogin(e) {
    const loginUser = {
      name: this.name,
      password: this.password
    };

    this.auth.loginUser(loginUser).subscribe(
      data => {
        this.loginUser = data;
        console.log(data);
      }
    );
    e.target.reset();
  }
}
