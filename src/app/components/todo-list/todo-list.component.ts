import { Component, OnInit } from '@angular/core';

import { Todo } from '../../classes/Todo';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private http: HttpClient, private api: ApiService) { }

  ngOnInit(): void {
    this.api.getData().subscribe(
      data => {
        this.todos = data;
      })
  }
  //
  // addTodo(todo: Todo) {
  //   this.todos.push(todo);
  // }

  // deleteTodo(todo: Todo) {
  //   this.todos = this.todos.filter(t => t.title !== todo.title);
  // }

}
