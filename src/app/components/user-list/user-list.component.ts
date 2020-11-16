import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {User} from '../../classes/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: User[];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getUsers().subscribe(
      data => {
        this.userList = data.data;
        }
    );
  }

}
