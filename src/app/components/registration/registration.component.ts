import { Component, OnInit } from '@angular/core';
import { TodosApiService } from '../../services/todos-api.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {UsersApiService} from '../../services/users-api.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(
    private api: UsersApiService,
    private router: Router,
    private fb: FormBuilder
   ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    const user = this.form.getRawValue();
    this.form.reset();
    this.api.postUsers(user).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      },
    );
  }
}
