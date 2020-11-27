import {TodoListModalService} from './todo-list-modal.service';
import {TestBed} from '@angular/core/testing';

describe('TodoListModalService', () => {
  let service: TodoListModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoListModalService]
    });
    service = TestBed.inject(TodoListModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('open modal', () => {
    expect(service.openModal).toBeDefined();
  });

});
