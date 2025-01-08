import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TasksService } from './tasks/tasks.service';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  { path: '', component: TasksComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,  
    AppRoutingModule,
    ReactiveFormsModule ,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [TasksService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
