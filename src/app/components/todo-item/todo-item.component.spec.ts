// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { TodoItemComponent } from './todo-item.component';
//
// describe('TodoItemComponent', () => {
//   let component: TodoItemComponent;
//   let fixture: ComponentFixture<TodoItemComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ TodoItemComponent ]
//     })
//     .compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(TodoItemComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TodosApiService } from '../../services/todos-api.service';
import { FormBuilder } from '@angular/forms';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async () => {
    authServiceStub = {
      isLoggedIn: true,
    };

    await TestBed.configureTestingModule({
      declarations: [ TodoItemComponent ],
      providers: [
        {provide: AuthService, useValue: authServiceStub},
        {provide: HttpClient},
        {provide: HttpHandler},
        {provide: TodosApiService},
        {provide: FormBuilder}
      ]
    });
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    authServiceStub = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

