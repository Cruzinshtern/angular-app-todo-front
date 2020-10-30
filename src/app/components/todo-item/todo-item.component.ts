import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { Todo } from '../../classes/Todo';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private api: ApiService) { }

  deletedTodos = [];

  ngOnInit(): void {
  }

  onDelete(todo) {
    this.api.deleteTodo(todo);

  }

}
