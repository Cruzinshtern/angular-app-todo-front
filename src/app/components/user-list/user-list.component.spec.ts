import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { AuthService } from '../../services/auth.service';
import { UsersApiService } from '../../services/users-api.service';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async () => {
    authServiceStub = {
      isLoggedIn: true,
    };

    await TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: AuthService, useValue: authServiceStub},
        {provide: UsersApiService},
        {provide: FormBuilder}
      ]
    });
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    authServiceStub = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
