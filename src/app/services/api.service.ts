import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export interface ITodo {
  name: string;
}

@Injectable()
export class ApiService {

  private todosURL = environment.API  + '/todos';
  private usersURL = environment.API  +  '/users';

  constructor(private http: HttpClient) { }

  _________________________________________________________________________________________________________________

  getTodos(): Observable<any> {
    return this.http.get(this.todosURL);
  }

  getTodo(id): Observable<any> {
    const endPoints = `/${id}`;
    return this.http.get(this.todosURL + endPoints);
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

  deleteTodo(todo): Observable<any> {
      const endPoints = `/${todo.id}`;
      return this.http.delete(this.todosURL + endPoints);
  }

  patchTodo(id, updatedData): Observable<any> {
    const endPoints = `/${id}`;
    return this.http.patch(this.todosURL + endPoints, updatedData);
  }

  editTodo(id, updatedData): Observable<any> {
    const endpoints = `/${id}`;
    return this.http.put(this.todosURL + endpoints, updatedData);
  }

}
