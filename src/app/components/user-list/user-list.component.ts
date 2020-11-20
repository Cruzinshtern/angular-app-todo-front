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

  page = 0;
  pageSize = 3;
  prevIsActive: boolean;
  nextIsActive: boolean;

  constructor(private api: ApiService) { }

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
        console.log(data);
        // const userRole = data.authUserInfo.role;
        if (!data.data) {
          this.denied = data.status;
        } else {
          this.userList = data.data.users;
        }
        const totalPages = data.data.totalPages;
        const currentPage = data.data.currentPage;
        console.log(totalPages);
        console.log(currentPage);
        if (currentPage === 0) {
          this.prevIsActive = false;
          this.nextIsActive = true;
        } else if (currentPage + 1 === totalPages) {
          this.prevIsActive = true;
          this.nextIsActive = false;
        } else {
          this.prevIsActive = true;
          this.nextIsActive = true;
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
