import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectComponent } from './comp/project/project.component';
import { AddTaskComponent } from './comp/add-task/add-task.component';
import { UserComponent } from './comp/user/user.component';
import { ViewTaskComponent } from './comp/view-task/view-task.component';
import { AddProjectComponent } from './comp/project/add-project/add-project.component';
import { ViewProjectComponent } from './comp/project/view-project/view-project.component';
import { AddUserComponent } from './comp/user/add-user/add-user.component';
import { ViewUserComponent } from './comp/user/view-user/view-user.component';
import { UserModalComponent } from './comp/user-modal/user-modal.component';
import { ParentTaskModalComponent } from './comp/parent-task-modal/parent-task-modal.component';
import { ProjectModalComponent } from './comp/project-modal/project-modal.component';
import { HttpClientModule} from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap';
import { EditTaskComponent } from './comp/edit-task/edit-task.component';
//import { HttpClient, HttpHeaders } from '@angular/common/http';

@NgModule({ 
  declarations: [
    AppComponent,
    ProjectComponent,
    AddTaskComponent,
    UserComponent,
    ViewTaskComponent,
    AddProjectComponent,
    ViewProjectComponent,
    AddUserComponent,
    ViewUserComponent,
    UserModalComponent,
    ParentTaskModalComponent,
    ProjectModalComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    AppRoutingModule//,
    //HttpClient
  ],
  providers: [ProjectComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
