import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Angular Forms Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HeaderComponent } from './core/header/header.component';
import { EmoployeesComponent } from './features/emoployees/emoployees.component';
import { CreateEmployeeComponent } from './features/create-employee/create-employee.component';
// MDB Angular Free

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmoployeesComponent,
    CreateEmployeeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
