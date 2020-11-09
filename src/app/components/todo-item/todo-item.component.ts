import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../classes/Todo';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { TodoListModalService } from '../../services/todo-list-modal.service';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() displayModalOpen: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient, private api: ApiService, private todoListModalService: TodoListModalService) { }

  ngOnInit(): void {
  }

  onDelete(todo) {
    this.api.deleteTodo(todo).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  changeProgStatus(todo) {
    this.api.patchTodo(todo.id, {
      isInProgress: !todo.isInProgress
    }).subscribe(
      data => {
        this.todo.isInProgress = data.data.isInProgress;
        console.log('ISINPROGRESS', todo.isInProgress);
      }
    );
  }

  changeDoneStatus(todo) {
    this.api.patchTodo(todo.id, {
      isCompleted: !todo.isCompleted
    }).subscribe(
      data => {
        this.todo.isCompleted = data.data.isCompleted;
        console.log('ISCOMPLETED', todo.isCompleted);
      }
    );
  }

 onClick() {
   this.todoListModalService.openModal(this.todo.id);
 }
}