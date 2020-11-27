import {Component, OnInit} from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { TodosApiService } from '../../services/todos-api.service';
import {UsersApiService} from '../../services/users-api.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  open: boolean;
  userCard;


  constructor(
    public modalService: ModalService,
    private api: UsersApiService,
  ) { }

  ngOnInit(): void {
    this.modalService.isModalUserOpen.subscribe((isModalUserOpen) => {
      this.open = isModalUserOpen;

      if (isModalUserOpen) {
        this.api.getUser(this.modalService.userModalId).subscribe(
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
    this.modalService.closeUserModal();
  }
}
