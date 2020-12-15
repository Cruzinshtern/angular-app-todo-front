// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { RegistrationComponent } from './registration.component';
//
// describe('RegistrationComponent', () => {
//   let component: RegistrationComponent;
//   let fixture: ComponentFixture<RegistrationComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ RegistrationComponent ]
//     })
//     .compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(RegistrationComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { UsersApiService } from '../../services/users-api.service';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async () => {
    authServiceStub = {
      isLoggedIn: true,
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ RegistrationComponent ],
      providers: [
        {provide: AuthService, useValue: authServiceStub},
        {provide: UsersApiService},
        {provide: FormBuilder}
      ]
    });
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    authServiceStub = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
