import { ModalService } from './modal.service';
import { TestBed } from '@angular/core/testing';

describe('TodoListModalService', () => {
  let service: ModalService;
  const MOCK_DATA = {id: '43', name: 'Name'};

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
    service.openModal(MOCK_DATA.id);
    expect(service.openModal).toBeDefined();
  });

  it('close modal', () => {
    service.closeModal();
    expect(service.closeModal).toBeDefined();
  });

  it('open modal for the user', () => {
    service.openUserModal(MOCK_DATA.id);
    expect(service.openUserModal).toBeDefined();
  });

  it('close modal for the user', () => {
    service.closeUserModal();
    expect(service.closeUserModal).toBeDefined();
  });

});
