import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import {TodosApiService} from '../../services/todos-api.service';
import {FormBuilder} from '@angular/forms';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async () => {
    authServiceStub = {
      isLoggedIn: true,
    };

    await TestBed.configureTestingModule({
      declarations: [ TodoListComponent ],
      providers: [
        {provide: AuthService, useValue: authServiceStub},
        {provide: HttpClient},
        {provide: HttpHandler},
        {provide: TodosApiService},
        {provide: FormBuilder}
      ]
    });
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    authServiceStub = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
