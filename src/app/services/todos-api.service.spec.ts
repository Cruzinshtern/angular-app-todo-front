import { TodosApiService } from './todos-api.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('TodosApiService', () => {
  let service: TodosApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const MOCK_TODOS = {
    data: {
      count: 4,
      result: [
        {id: '1', name: 'Todo 1'},
        {id: '2', name: 'Todo 2'},
        {id: '3', name: 'Todo 3'}
      ]
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodosApiService]
    });
    service = TestBed.inject(TodosApiService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve todos via GET', (done) => {
    spyOn(httpClient, 'get').and.returnValue(of(MOCK_TODOS));
    service.getTodos('').subscribe(
      data => {
        expect(data).toEqual(MOCK_TODOS);
        done();
      }
    );
  });

  it('should retrieve one todo via GET', () => {
    const todoToGet = MOCK_TODOS.data.result[0];
    spyOn(httpClient, 'get').and.returnValue(of(MOCK_TODOS));
    service.getTodo(todoToGet.id).subscribe(
      () => {
        const todoNec = MOCK_TODOS.data.result.find(todo => todo.id === todoToGet.id);
        expect(todoNec).toEqual(todoToGet);
      }
    );
  });

  it('should create todo via POST', (done) => {
    const newTodo = {id: '4', name: 'Todo'};
    spyOn(httpClient, 'post').and.returnValue(of(MOCK_TODOS));
    service.postTodos(newTodo).subscribe(
      data => {
        MOCK_TODOS.data.result.push(newTodo);
        expect(data).toEqual(MOCK_TODOS);
        done();
      }
    );
  });

  it('should delete todo via DELETE', (done) => {
    service.todosData.next(MOCK_TODOS.data);
    const todoToDelete = MOCK_TODOS.data.result[0];
    spyOn(httpClient, 'delete').and.returnValue(of(MOCK_TODOS));
    service.deleteTodo(todoToDelete).then(
      () => {
        const deletedTodo = service.todosData.getValue().result.find((user) => user.id === todoToDelete.id);
        expect(deletedTodo).toBeUndefined();
        done();
      }
    );
  });

});
