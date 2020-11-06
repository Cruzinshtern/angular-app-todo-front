import { Component, OnInit } from '@angular/core';
import { Todo } from '../../classes/Todo';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private http: HttpClient, private api: ApiService) { }

  ngOnInit(): void {
    this.api.getTodos().subscribe(
      data => {
        this.todos = data;
      });
  }
  }
