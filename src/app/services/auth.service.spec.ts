import { AuthService } from './auth.service';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;


  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {provide: AuthService},
        {provide: HttpClient},
        {provide: HttpHandler},
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show logged in', () => {
    expect(service.isLoggedIn).toBeFalsy();
  });

});
