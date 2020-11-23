import { Component, OnInit } from '@angular/core';
import { Todo } from '../../classes/Todo';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
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

  constructor(
    private http: HttpClient,
    private api: ApiService,
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
    this.getAllPaginatedTodos();
  }

  nextPage(): void {
    this.page++;
    this.getAllPaginatedTodos();
  }

  onClick(): void {
    const params = {
      name: this.name
    };
    this.getAllPaginatedTodos();
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
