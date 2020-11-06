import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { FormsModule } from '@angular/forms';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { HomeComponent } from './components/home/home.component';
import { ApiService } from './services/api.service';
import { ParamInterceptor } from './api.interceptor';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TodoEditModalComponent } from './components/todo-edit-modal/todo-edit-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TodoFormComponent,
    TodoListComponent,
    TodoItemComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    TodoItemComponent,
    TodoEditModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ParamInterceptor,
    multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

