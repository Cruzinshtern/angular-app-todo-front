import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedUser: string;

  constructor(public auth: AuthService, private api: ApiService) { }

  ngOnInit(): void {
    this.api.getUsers().subscribe(
      response => {
        console.log('Home', response);
        this.loggedUser = response.userInfo.name;
      }
    )
  }

}
