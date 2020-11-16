import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginURL = environment.API  + '/login';


  constructor(private http: HttpClient, private router: Router) {  }

  public getToken() {
    return localStorage.getItem('auth_token');
  }

  loginUser(user): Observable<any>{
    return this.http.post(this.loginURL, user);
}

  logoutUser() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['']);
  }

  // getLoggedUserInfo() {
  //   const token = this.getToken();
  //
  // }

  public get isLoggedIn(): boolean {
    return (
      this.getToken() !== null
    );
  }

  public get isLoggedOut(): boolean {
    return (
      this.getToken() == null
    );
  }
}
