import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { User } from '../../classes/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  listUsers: User[];

  constructor(private http: HttpClient, private api: ApiService) { }

  ngOnInit(): void {
    this.api.getUsers().subscribe(
      data => {
        this.listUsers = data;
      }
    );

  }

}
