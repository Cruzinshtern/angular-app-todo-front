import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';
import { Todo } from '../classes/Todo';
import { User } from '../classes/User';
import {environment} from '../../environments/environment';

export interface ITodo {
  name: string;
}

@Injectable()
export class ApiService {

  private URL = environment.API  + '/';
  private todosURL = environment.API  + '/todos';
  private usersURL = environment.API  +  '/users';

  constructor(private http: HttpClient) { }

  todo: Todo;

  getData(): Observable<any> {
    return this.http.get(this.todosURL);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.usersURL);
  }

  postTodos(todo): Observable<any> {
    return this.http.post(this.todosURL, todo);
  }

  postUsers(user): Observable<any> {
    return this.http.post(this.usersURL, user);
  }

  deleteTodo(todo) {
    const endPoints = `/${todo.id}`;
    this.http.delete(this.todosURL + endPoints).subscribe(
      data => {
        console.log(data);
      });
  }


}
