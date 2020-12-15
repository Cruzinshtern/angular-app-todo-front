import { AuthService } from './auth.service';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const MOCK_USERS = {
    data: {
      count: 4,
      result: [
        {id: '1', name: 'Test user 1'},
        {id: '2', name: 'Test user 2'},
        {id: '3', name: 'Test user 3'},
      ]
    }
  };

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        AuthService
      ]
    });
    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login the user via POST', (done) => {
    const userToLogin = MOCK_USERS.data.result[0];
    spyOn(httpClient, 'post').and.returnValue(of(MOCK_USERS));
    service.loginUser(userToLogin).subscribe(
      data => {
        const authUser = data.data.result.find(user => user.id === userToLogin.id);
        expect(authUser).toBeDefined();
        done();
      }
    );
  });

  it('should logout the user via POST', () => {
    // const MOCK_LOCAL_STORAGE = {
    //   token: 'this is my token'
    // };
    service.logoutUser();
    expect(service.logoutUser).toBeTruthy();
  });

  it('should show logged in', () => {
    expect(service.isLoggedIn).toBeFalsy();
  });

  it('should show logged out', () => {
    expect(service.isLoggedOut).toBeTruthy();
  });

});
