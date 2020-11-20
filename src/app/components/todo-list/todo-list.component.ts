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
  isAdmin: boolean;
  userName: string;
  page = 0;
  pageSize = 3;
  prevIsActive: boolean;
  nextIsActive: boolean;

  constructor(private http: HttpClient, private api: ApiService) { }

  ngOnInit(): void {
    this.getAllPaginatedTodos();
  }

  getAllPaginatedTodos(): void {
    const params = {
      page: this.page,
      size: this.pageSize
    };
    this.api.getTodos(params).subscribe(
      data => {
        console.log(data.data);
        this.todos = data.data.todos;
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
  }

  prevPage(): void {
    this.page--;
    this.getAllPaginatedTodos();
  }

  nextPage(): void {
    this.page++;
    this.getAllPaginatedTodos();
  }

  }
