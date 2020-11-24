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
  name = '';
  page = 0;
  pageSize = 3;
  prevIsActive: boolean;
  nextIsActive: boolean;
  isCompleted: boolean;
  sortForm: FormGroup;
  sorted: boolean;

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
    this.sorted = false;
  }

  getAllPaginatedTodos(): void {
    const params = {
      name: this.name,
      page: this.page,
      size: this.pageSize
    };
    this.api.getTodos(params).subscribe((data) => {
      this.todos = data.data.todos;
      this.userName = data.authUserInfo.name;
      const totalPages = data.data.totalPages;
      const currentPage = data.data.currentPage;
      if (currentPage === 0) {
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
    if (!this.sorted) {
      this.getAllPaginatedTodos();
    } else {
      this.sortClick();
    }
  }

  nextPage(): void {
    this.page++;
    if (!this.sorted) {
      this.getAllPaginatedTodos();
    } else {
      this.sortClick();
    }
  }

  onClick(): void {
    const params = {
      name: this.name
    };
    this.getAllPaginatedTodos();
  }
  sortClick(): void {
    const params = {
      name: this.name,
      page: this.page,
      size: this.pageSize
    };
    this.api.sortTodosByName(params).subscribe(
      data => {
        const totalPages = data.totalPages;
        const currentPage = data.currentPage;
        if (currentPage === 0) {
          this.prevIsActive = false;
          this.nextIsActive = true;
        } else if (currentPage + 1 === totalPages) {
          this.prevIsActive = true;
          this.nextIsActive = false;
        } else {
          this.prevIsActive = true;
          this.nextIsActive = true;
        }
      }
    );
    this.sorted = true;
  }

  sortByStatus(): void {
    const statusFormData = this.sortForm.getRawValue();
    console.log('statusData', statusFormData);
    if (statusFormData.status === 'In progress') {
      this.api.getInProgressTodos().subscribe(
        data => {
          console.log(data);
          this.todos = data;
        }
      );
    } else {
      this.api.getCompletedTodos().subscribe(
        data => {
          console.log(data);
          this.todos = data;
        }
      );
    }
  }
}
