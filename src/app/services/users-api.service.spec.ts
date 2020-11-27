import { UsersApiService } from './users-api.service';
import {TestBed} from '@angular/core/testing';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('UsersApiService', () => {
  let service: UsersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: UsersApiService},
        {provide: HttpClient},
        {provide: HttpHandler}
      ]
    });
    service = TestBed.inject(UsersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
