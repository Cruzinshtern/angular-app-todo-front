import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../services/auth.service';
import { By } from 'protractor';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async () => {
    authServiceStub = {
      isLoggedIn: true,
    };
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [{provide: AuthService, useValue: authServiceStub}]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authServiceStub = TestBed.inject(AuthService);

  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loggedIn', () => {
    expect(authServiceStub.isLoggedIn).toBeTruthy();
  });

  it('contains navbar class', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('Welcome to my Todo App');
  });

});
