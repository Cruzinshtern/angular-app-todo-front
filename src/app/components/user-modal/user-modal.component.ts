import { Component, OnInit } from '@angular/core';
import { TodoListModalService } from '../../services/todo-list-modal.service';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  open: boolean;
  userCardForm: FormGroup;

  constructor(
    public todoListModalService: TodoListModalService,
    private api: ApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.todoListModalService.isModalUserOpen.subscribe((isModalUserOpen) => {
      this.open = isModalUserOpen;

      if (isModalUserOpen) {
        this.api.getUser(this.todoListModalService.userModalId).subscribe(
          data => {
            this.userCardForm = this.fb.group({
              name: new FormControl(data.data.name),
              email: new FormControl(data.data.email)
            });
            }
        );
      }
    });
  }

  onClick() {
    this.todoListModalService.closeUserModal();
  }

}
