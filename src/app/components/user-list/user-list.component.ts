import { Component, OnInit } from '@angular/core';
import {TodosApiService} from '../../services/todos-api.service';
import {User} from '../../classes/User';
import {UsersApiService} from '../../services/users-api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: User[] = [];
  isAdmin: boolean;
  denied: string;
  page = 0;
  pageSize = 3;
  prevIsActive: boolean;
  nextIsActive: boolean;

  constructor(private api: UsersApiService) { }

  ngOnInit(): void {
    this.getAllPaginatedUsers();
  }

  getAllPaginatedUsers(): void {
    const params = {
      page: this.page,
      size: this.pageSize
    };
    this.api.getUsers(params).subscribe(
      data => {
        const userRole = data.authUserInfo.role;
        this.isAdmin = userRole === 'Admin';
        if (!data.data) {
          this.denied = data.status;
        } else {
          this.userList = data.data.result;
          const totalPages = data.data.totalPages;
          const currentPage = data.data.currentPage;
          if (totalPages === 1) {
            this.prevIsActive = false;
            this.nextIsActive = false;
          } else if (currentPage === 0) {
            this.prevIsActive = false;
            this.nextIsActive = true;
          } else if (currentPage + 1 === totalPages) {
            this.prevIsActive = true;
            this.nextIsActive = false;
          } else {
            this.prevIsActive = true;
            this.nextIsActive = true;
        }}
      }
    );
    this.api.usersData.subscribe(
      data => {
        if (!data) {
          this.userList = [];
        } else {
          this.userList = data.users;
        }

      }
    );
  }

  prevPage(): void {
    this.page--;
    this.getAllPaginatedUsers();
  }

  nextPage(): void {
    this.page++;
    this.getAllPaginatedUsers();
  }

}
