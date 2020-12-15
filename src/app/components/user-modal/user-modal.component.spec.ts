import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserModalComponent } from './user-modal.component';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserModalComponent', () => {
  let component: UserModalComponent;
  let fixture: ComponentFixture<UserModalComponent>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async () => {
    authServiceStub = {
      isLoggedIn: true,
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ UserModalComponent ],
      providers: [
        {provide: AuthService, useValue: authServiceStub},
        {provide: FormBuilder},
      ]
    });
    fixture = TestBed.createComponent(UserModalComponent);
    component = fixture.componentInstance;
    authServiceStub = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
