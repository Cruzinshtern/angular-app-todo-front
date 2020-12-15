import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { AuthService } from '../../services/auth.service';
import { TodosApiService } from '../../services/todos-api.service';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
      imports: [HttpClientTestingModule],
      providers: [
        {provide: AuthService, useValue: authServiceStub},
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
