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
  isAdmin: boolean;
  isManager: boolean;
  denied: string;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getUsers().subscribe(
      data => {
        console.log(data);
        const userRole = data.userRole;
        if (userRole === 'User') {
          this.denied = data.status;
        } else if (userRole === 'Manager') {
          this.isManager = true;
          this.userList = data.data;
        } else {
          this.isAdmin = true;
          this.userList = data.data;
        }
        }
    );
  }

}
