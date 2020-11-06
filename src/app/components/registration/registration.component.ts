import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(
    private api: ApiService,
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

  onSubmit() {
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
