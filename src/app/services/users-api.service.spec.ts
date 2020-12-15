import { UsersApiService } from './users-api.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import {of} from 'rxjs';

describe('UsersApiService', () => {
  let service: UsersApiService;
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
      imports: [HttpClientTestingModule],
      providers: [UsersApiService]
    });
    service = TestBed.inject(UsersApiService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve users via GET', (done) => {
    const testUsers = {
      data: [
        {name: 'Test user 1'},
        {name: 'Test user 2'},
        {name: 'Test user 3'},
      ]
    };
    spyOn(httpClient, 'get').and.returnValue(of(testUsers));
    service.getUsers('').subscribe(
      data => {
        expect(data).toEqual(testUsers);
        expect(service.usersData.getValue()).toEqual(testUsers.data);
        done();
      }
    );
  });

  it('should retrieve one todo via GET', () => {
    const userToGet = MOCK_USERS.data.result[0];
    spyOn(httpClient, 'get').and.returnValue(of(MOCK_USERS));
    service.getUser(userToGet.id).subscribe(
      () => {
        const todoNec = MOCK_USERS.data.result.find(todo => todo.id === userToGet.id);
        expect(todoNec).toEqual(userToGet);
      }
    );
  });

  it('should create user via POST', (done) => {
    const newUser = {id: '4', name: 'Test user 4'};
    spyOn(httpClient, 'post').and.returnValue(of(MOCK_USERS));
    service.postUsers(newUser).subscribe(
      data => {
        MOCK_USERS.data.result.push(newUser);
        expect(data).toEqual(MOCK_USERS);
        done();
      }
    );
  });

  it('should delete user via DELETE', (done) => {
    service.usersData.next(MOCK_USERS.data);
    const userToDelete = MOCK_USERS.data.result[0];
    // console.log('USERSDATA', service.usersData.getValue().result);
    spyOn(httpClient, 'delete').and.returnValue(of(MOCK_USERS));
    service.deleteUser(userToDelete).then(
      () => {
        const deletedUser = service.usersData.getValue().result.find((user) => user.id === userToDelete.id);
        // console.log('DATA FROM DELETE METHOD', deletedUser, userToDelete.id);
        expect(deletedUser).toBeUndefined();
        done();
      }
    );
  });

});
