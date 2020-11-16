import { Component, OnInit } from '@angular/core';
import { TodoListModalService } from '../../services/todo-list-modal.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  open: boolean;
  userCard;

  constructor(
    public todoListModalService: TodoListModalService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.todoListModalService.isModalUserOpen.subscribe((isModalUserOpen) => {
      this.open = isModalUserOpen;

      if (isModalUserOpen) {
        this.api.getUser(this.todoListModalService.userModalId).subscribe(
          data => {
              this.userCard = {
                name: data.data.name,
                email: data.data.email,
                role: data.data.role,
                todos: data.data.todos.map(todo => todo.name)
              };
              console.log('USERCARD', this.userCard);
            }
        );
      }
    });
  }

  onClick() {
    this.todoListModalService.closeUserModal();
  }

}
