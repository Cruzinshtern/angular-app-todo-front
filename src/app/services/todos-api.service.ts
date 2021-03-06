import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';


export interface ITodo {
  name: string;
}

@Injectable()
export class TodosApiService {

  todosData: BehaviorSubject<any> = new BehaviorSubject<any>({});

  todosURL = environment.API  + '/todos';

  constructor(private http: HttpClient) { }

  _________________________________________________________________________________________________________________

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

  postTodos(todo): Observable<any> {
    return this.http.post(this.todosURL, todo);
  }

  async deleteTodo(todo): Promise<void> {
      const endPoints = `/${todo.id}`;
      const res = await this.http.delete<any>(this.todosURL + endPoints).toPromise();
      const {data} = res;
      const todosData = this.todosData.getValue();
      const todos = todosData.result.filter((todoData) => todoData.id !== todo.id);

      this.todosData.next( {
        ...todosData,
        result: todos
      });
  }

  editTodo(id, updatedData): Observable<any> {
    const endpoints = `/${id}`;
    return this.http.patch(this.todosURL + endpoints, updatedData);
  }

}
