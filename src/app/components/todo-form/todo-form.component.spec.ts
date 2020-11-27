import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoFormComponent } from './todo-form.component';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TodosApiService } from '../../services/todos-api.service';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async () => {
    authServiceStub = {
      isLoggedIn: true,
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ TodoFormComponent ],
      providers: [
        {provide: AuthService, useValue: authServiceStub},
        {provide: HttpClient},
        {provide: HttpHandler},
        {provide: TodosApiService},
        {provide: FormBuilder},
      ]
    });
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    authServiceStub = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
