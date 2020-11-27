import { ModalService } from './modal.service';
import { TestBed } from '@angular/core/testing';

describe('TodoListModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalService]
    });
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('open modal', () => {
    expect(service.openModal).toBeDefined();
  });

  it('close modal', () => {
    expect(service.closeModal).toBeDefined();
  });

});
