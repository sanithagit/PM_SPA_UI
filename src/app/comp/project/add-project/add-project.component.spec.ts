import { TestBed, async, ComponentFixture, inject  } from '@angular/core/testing';
import { AppComponent } from 'src/app//app.component';
import { ProjectComponent } from 'src/app//comp/project/project.component';
import { AddTaskComponent } from 'src/app//comp/add-task/add-task.component';
import { UserComponent } from 'src/app//comp/user/user.component';
import { ViewTaskComponent } from 'src/app//comp/view-task/view-task.component';
import { ViewProjectComponent } from 'src/app//comp/Project/view-project/view-project.component';
import { AddUserComponent } from 'src/app//comp/User/add-user/add-user.component';
import { ViewUserComponent } from 'src/app//comp/User/view-user/view-user.component';
import { UserModalComponent } from 'src/app//comp/user-modal/user-modal.component';
import { ParentTaskModalComponent } from 'src/app//comp/parent-task-modal/parent-task-modal.component';
import { ProjectModalComponent } from 'src/app//comp/project-modal/project-modal.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import { AddProjectComponent } from 'src/app//comp/Project/add-project/add-project.component';
import {APP_BASE_HREF} from '@angular/common';
import { EditTaskComponent } from 'src/app/comp/edit-task/edit-task.component';
import { Project } from 'src/app/models/Project';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ServiceService } from 'src/app/services/service.service';
import { Task } from 'src/app/models/task';

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ProjectComponent,
      AddTaskComponent,
        EditTaskComponent,
        UserComponent,
        ViewTaskComponent,        
        ViewProjectComponent,
        AddProjectComponent,
        AddUserComponent,
        ViewUserComponent,
        UserModalComponent, 
        ParentTaskModalComponent,
        ProjectModalComponent,
        EditTaskComponent],
        imports: [
          AppRoutingModule,
          FormsModule,
          HttpClientModule,
          HttpClientTestingModule,
          ModalModule.forRoot()
        ],
        providers: [{provide: APP_BASE_HREF, useValue : '/' },ProjectComponent]
      })
      .compileComponents();
    }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Get all users', () => {
    spyOn(component, 'GetAllUsers').and.callThrough();
    component.GetAllUsers();
    expect(component.GetAllUsers).toHaveBeenCalled();
  });


   it('Add Project ',()=>{    
    component.OnSubmit();
    expect(component).toBeTruthy();
   });   

   //it('Add project', inject([ServiceService,ProjectComponent], (service: ServiceService, projDet:ProjectComponent) => {
   it('Add project service',inject([ServiceService],  (service: ServiceService) => { 
    var project: Project =
    {
      ProjectId: 0,
      ProjectName: 'testproject',
      ProjectStartDate: new Date('2019-01-01'), 
      ProjectEndDate: new Date('2019-12-01'),
      ProjectPriority: 3,
      ProjectUserId: null,
      ProjectTotalTasks: null,
      ProjectTasksCompleted: null
    }
  
    
    service.AddProject(project).subscribe();
    fixture.detectChanges();
    expect(service).toBeTruthy();
  }));



});
