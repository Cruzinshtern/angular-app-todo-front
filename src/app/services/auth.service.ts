import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginURL = environment.API  + '/login';

  constructor(private http: HttpClient) {  }

  loginUser(user): Observable<any> {
    return this.http.post(this.loginURL, user);
  }
}


