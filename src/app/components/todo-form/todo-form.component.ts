import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})

export class TodoFormComponent implements OnInit {
  @Output() addTodo: EventEmitter<any> = new EventEmitter();
  form: FormGroup;

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
    name: [null, Validators.required],
    description: [null],
    isCompleted: [false]
  });
  }

  onSubmit() {
    const todo = this.form.getRawValue();
    this.form.reset();
    this.api.postTodos(todo).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['todolist']);
      }
    );
  }
}
