import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import {Todo} from '../../classes/Todo';
import { v4 as uuidv4 } from 'uuid';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  @Output() addTodo: EventEmitter<any> = new EventEmitter();
  id: string;
  name: string;
  todoArr = [];


  constructor(private http: HttpClient, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    // this.api.postData().subscribe(
    //   data => {
    //     this.objTodo = data;
    //   }
    // );
  }

  onSubmit(e) {
    const todo = {
      id: uuidv4(),
      name: this.name
    };

    this.api.postTodos(todo).subscribe(
      data => {
        this.todoArr = data;
        console.log(data);
        this.router.navigate(['todolist']);
      }
    );
    e.target.reset();
  }
}
