import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';


export interface ITodo {
  name: string;
}

@Injectable()
export class ApiService {

  todosData: BehaviorSubject<any> = new BehaviorSubject<any>({});
  usersData: BehaviorSubject<any> = new BehaviorSubject<any>({});

  private todosURL = environment.API  + '/todos';
  private usersURL = environment.API  +  '/users';
  private completedTodosURL = environment.API + '/completed';
  private inProgressURL = environment.API + '/progress';

  constructor(private http: HttpClient) { }

  _________________________________________________________________________________________________________________

  getTodosAll(): Observable<any> {
    return this.http.get(this.todosURL);
  }

  getTodos(params): Observable<any> {
    return this.http.get<any>(this.todosURL, {params}).pipe(map((data) => {
      this.todosData.next(data.data);
      return data;
    }));
  }

  getTodo(id): Observable<any> {
    const endPoints = `/${id}`;
    return this.http.get(this.todosURL + endPoints);
  }

  getCompletedTodos(): Observable<any> {
    return this.http.get(this.completedTodosURL);
  }

  getInProgressTodos(): Observable<any> {
    return this.http.get(this.inProgressURL);
  }


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

  postTodos(todo): Observable<any> {
    return this.http.post(this.todosURL, todo);
  }

  postUsers(user): Observable<any> {
    return this.http.post(this.usersURL, user);
  }

  async deleteTodo(todo): Promise<void> {
      const endPoints = `/${todo.id}`;
      const {data} = await this.http.delete<any>(this.todosURL + endPoints).toPromise();

      const todos = this.todosData.getValue().todos.filter((todoData) => todoData.id !== todo.id);

      this.todosData.next( {
        ...this.todosData.getValue(),
        todos
      });
  }

  async deleteUser(user): Promise<void> {
    const endPoints = `/${user.id}`;
    const {data} = await this.http.delete<any>(this.usersURL + endPoints).toPromise();

    const users = this.usersData.getValue().users.filter((userData) => userData.id !== user.id);

    this.usersData.next({
      ...this.usersData.getValue(),
      users
    });
  }

  patchTodo(id, updatedData): Observable<any> {
    const endPoints = `/${id}`;
    return this.http.patch(this.todosURL + endPoints, updatedData);
  }

  editTodo(id, updatedData): Observable<any> {
    const endpoints = `/${id}`;
    return this.http.patch(this.todosURL + endpoints, updatedData);
  }

}
