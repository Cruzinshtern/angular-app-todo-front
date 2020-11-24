import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../classes/User';
import { TodoListModalService } from '../../services/todo-list-modal.service';
import {TodosApiService} from '../../services/todos-api.service';
import {UsersApiService} from '../../services/users-api.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() user: User;
  @Input() isAdmin;
  @Output() displayModalOpen: EventEmitter<boolean> = new EventEmitter();

  constructor(public todoListModalService: TodoListModalService,
              private api: UsersApiService
  ) { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.todoListModalService.openUserModal(this.user.id);
  }

  onDelete(user): void {
    this.api.deleteUser(user);
  }
}
