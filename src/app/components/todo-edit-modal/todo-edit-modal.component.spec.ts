import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoEditModalComponent } from './todo-edit-modal.component';
import { AuthService } from '../../services/auth.service';
import { TodosApiService } from '../../services/todos-api.service';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
      imports: [HttpClientTestingModule],
      providers: [
        {provide: AuthService, useValue: authServiceStub},
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
