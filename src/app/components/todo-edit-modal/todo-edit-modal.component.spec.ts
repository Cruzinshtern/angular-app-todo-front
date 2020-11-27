import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoEditModalComponent } from './todo-edit-modal.component';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TodosApiService } from '../../services/todos-api.service';
import { FormBuilder } from '@angular/forms';

describe('TodoEditModalComponent', () => {
  let component: TodoEditModalComponent;
  let fixture: ComponentFixture<TodoEditModalComponent>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async () => {
    authServiceStub = {
      isLoggedIn: true,
    };

    await TestBed.configureTestingModule({
      declarations: [ TodoEditModalComponent ],
      providers: [
        {provide: AuthService, useValue: authServiceStub},
        {provide: HttpClient},
        {provide: HttpHandler},
        {provide: TodosApiService},
        {provide: FormBuilder}
      ]
    });
    fixture = TestBed.createComponent(TodoEditModalComponent);
    component = fixture.componentInstance;
    authServiceStub = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
