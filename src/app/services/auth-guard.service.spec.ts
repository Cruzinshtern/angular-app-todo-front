import { AuthGuardService } from './auth-guard.service';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let authServiceStub: Partial<AuthService>;

  beforeEach(() => {
    authServiceStub = {
      isLoggedIn: true
    };
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthGuardService, useValue: AuthGuardService},
        {provide: AuthService, useValue: authServiceStub}
      ]
    });
    service = TestBed.inject(AuthGuardService);
    authServiceStub = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('allow to navigate', () => {
   expect(service.canActivate).toBeFalsy();
  });
});
