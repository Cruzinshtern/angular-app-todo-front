import { Component, OnInit } from '@angular/core';
import { Todo } from '../../classes/Todo';
import { HttpClient } from '@angular/common/http';
import { TodosApiService } from '../../services/todos-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  isAdmin: boolean;
  userName: string;
  field = '';
  dir = '';
  name = '';
  page = 0;
  pageSize = 3;
  prevIsActive: boolean;
  nextIsActive: boolean;
  isCompleted: boolean;
  sortForm: FormGroup;

  constructor(
    private http: HttpClient,
    public api: TodosApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAllPaginatedTodos();
    this.sortForm = this.fb.group({
      status: [null, Validators.required]
    });
  }

  getAllPaginatedTodos(): void {
    const params = {
      field: this.field,
      dir: this.dir,
      name: this.name,
      page: this.page,
      size: this.pageSize
    };
    this.api.getTodos(params).subscribe((data) => {
      console.log(data);
      this.todos = data.data.result;
      this.userName = data.authUserInfo.name;
      const totalPages = data.data.totalPages;
      const currentPage = data.data.currentPage;
      if (totalPages === 1) {
        this.prevIsActive = false;
        this.nextIsActive = false;
      } else if (currentPage === 0) {
        this.prevIsActive = false;
        this.nextIsActive = true;
      } else if (currentPage + 1 === totalPages) {
        this.prevIsActive = true;
        this.nextIsActive = false;
      } else {
        this.prevIsActive = true;
        this.nextIsActive = true;
      }
    });
    this.api.todosData.subscribe(
      data => {
        this.todos = data.todos;
    });
  }

  prevPage(): void {
    this.page--;
    this.getAllPaginatedTodos();
  }

  nextPage(): void {
    this.page++;
    this.getAllPaginatedTodos();
  }

  searchButton(): void {
    const params = {
     name: this.name
    };
    this.getAllPaginatedTodos();
  }

  sortByNameClick(): void {
    this.field = 'name';
    this.dir = 'ASC';
    this.getAllPaginatedTodos();
  }

  sortByDescClick(): void {
    this.field = 'description';
    this.dir = 'ASC';
    this.getAllPaginatedTodos();
  }

}
