import { TodosApiService } from './todos-api.service';
import {TestBed} from '@angular/core/testing';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('TodosApiService', () => {
  let service: TodosApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: TodosApiService},
        {provide: HttpClient},
        {provide: HttpHandler}
      ]
    });
    service = TestBed.inject(TodosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
