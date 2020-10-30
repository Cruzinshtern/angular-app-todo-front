import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  userArr = [];

  constructor(private http: HttpClient, private api: ApiService) { }

  ngOnInit(): void {
  }

  onSubmit(e) {
    const newUser = {
      id: uuidv4(),
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.api.postUsers(newUser).subscribe(
      data => {
        this.userArr = data;
        console.log(data);
      }
    );
    e.target.reset();
  }

}
