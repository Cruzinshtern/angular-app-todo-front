import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListModalService {

  todoId: string;

  isOpen = new BehaviorSubject(false);

  constructor() {  }

  openModal(id): void {
    this.todoId = id;
    this.isOpen.next(!this.isOpen.getValue());
  }

  closeModal(): void {
    this.isOpen.next(!this.isOpen.getValue());
  }
}

