import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserItemComponent } from './user-item.component';
import { AuthService } from '../../services/auth.service';
import { UsersApiService } from '../../services/users-api.service';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserItemComponent', () => {
  let component: UserItemComponent;
  let fixture: ComponentFixture<UserItemComponent>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async () => {
    authServiceStub = {
      isLoggedIn: true,
    };

    await TestBed.configureTestingModule({
      declarations: [ UserItemComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: AuthService, useValue: authServiceStub},
        {provide: UsersApiService},
        {provide: FormBuilder}
      ]
    });
    fixture = TestBed.createComponent(UserItemComponent);
    component = fixture.componentInstance;
    authServiceStub = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
