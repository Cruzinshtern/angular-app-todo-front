import { AuthGuardService } from './auth-guard.service';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let authServiceStub = {isLoggedOut: true};
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
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

  // it('allow to navigate', fakeAsync(() => {
  //   tick();
  //   if (authServiceStub.isLoggedOut) {
  //     expect(router.navigate).toHaveBeenCalledWith(['login']);
  //   }
  // }));
});
