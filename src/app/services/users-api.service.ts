import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  usersData: BehaviorSubject<any> = new BehaviorSubject<any>({});


  private usersURL = environment.API  +  '/users';

  constructor(private http: HttpClient) { }

_______________________________________________________________________________________

  getUsers(params): Observable<any> {
    return this.http.get<any>(this.usersURL, {params}).pipe(map((data) => {
      this.usersData.next(data.data);
      return data;
    }));
  }

  getUser(id): Observable<any> {
    const endPoints = `/${id}`;
    return this.http.get(this.usersURL + endPoints);
  }

  postUsers(user): Observable<any> {
    return this.http.post(this.usersURL, user);
  }

  async deleteUser(user): Promise<void> {
    const endPoints = `/${user.id}`;
    const {data} = await this.http.delete<any>(this.usersURL + endPoints).toPromise();
    console.log('DATA', data);
    const users = this.usersData.getValue().users.filter((userData) => userData.id !== user.id);

    this.usersData.next({
      ...this.usersData.getValue(),
      users
    });
  }

}
