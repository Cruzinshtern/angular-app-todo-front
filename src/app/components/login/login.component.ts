import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  token;

  constructor(
    public auth: AuthService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onLogin() {
    const loginUser = this.form.getRawValue();
    this.form.reset();
    this.auth.loginUser(loginUser).subscribe(
      (response: any) => {
        if (response.data == null) {
          console.log(response);
          // alert(response.data);
        } else {
          console.log(response);
          console.log('TOKEN', response.data);
          localStorage.setItem('auth_token', response.data);
          this.router.navigate(['form']);
        }
      }
    );
  }
  onLogout() {
    this.auth.logoutUser();
  }
}
