import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { TodosApiService } from '../../services/todos-api.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-edit-modal',
  templateUrl: './todo-edit-modal.component.html',
  styleUrls: ['./todo-edit-modal.component.css']
})

export class TodoEditModalComponent implements OnInit {
  open: boolean;
  editableTodoForm: FormGroup;

  constructor(
    public todoListModalService: ModalService,
    private api: TodosApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.todoListModalService.isOpen.subscribe((isOpen) => {
      this.open = isOpen;

      if (isOpen) {
        this.api.getTodo(this.todoListModalService.todoId).subscribe(
          data => {
            this.editableTodoForm = this.fb.group({
              name: new FormControl (data.data.name),
              description: new FormControl (data.data.description)
            });
          }
        );
      }
      console.log('MODAL OPEN: ', this.open);
    });
  }

  onClick(): void {
    this.todoListModalService.closeModal();
  }

  onSubmit(): void {
    const editedTodo = this.editableTodoForm.getRawValue();
    this.api.editTodo(this.todoListModalService.todoId, {
      name: this.editableTodoForm.value.name,
      description: this.editableTodoForm.value.description
    }).subscribe();
    this.todoListModalService.closeModal();
  }
}
