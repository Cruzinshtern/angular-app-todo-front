import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../classes/Todo';
import { HttpClient } from '@angular/common/http';
import { TodosApiService } from '../../services/todos-api.service';
import { ModalService } from '../../services/modal.service';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  newTodoList = [];

  @Input() todo: Todo;
  @Output() displayModalOpen: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private api: TodosApiService,
    private todoListModalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  changeProgStatus(todo): void {
    this.api.editTodo(todo.id, {
      isInProgress: !todo.isInProgress
    }).subscribe(
      data => {
        this.todo.isInProgress = data.data.isInProgress;
        console.log('ISINPROGRESS', todo.isInProgress);
      }
    );
  }

  changeDoneStatus(todo): void {
    this.api.editTodo(todo.id, {
      isCompleted: !todo.isCompleted
    }).subscribe(
      data => {
        this.todo.isCompleted = data.data.isCompleted;
        console.log('ISCOMPLETED', todo.isCompleted);
      }
    );
  }

 onClick(): void {
   this.todoListModalService.openModal(this.todo.id);
 }

  onDelete(todo): void {
    this.api.deleteTodo(todo);
  }
}
