import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Task } from 'src/app/models/task';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  task: Task = {
    TaskId: null,
    TaskName: null,
    ProjectId: null,
    ParentId: null,
    UserId: null,
    Parent: null,
    Priority: null,
    ProjectStartDate: null,
    ProjectEndDate: null,
    isParentTask: false,
    Status:true
  }
  tasks: Task[];
  projects: Project[];
  users: User[];
  parentTasks: Task[];
  projectName: string;
  isParentTask: boolean = false;
  parentTask: string;
  userName: string;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private sharedService: ServiceService, private router: Router) { }

  ngOnInit() {
    const today = new Date();
    this.task.ProjectStartDate = today;
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    this.task.ProjectEndDate = tomorrow;
    this.task.Priority = 0;
    this.GetAllTasks();
    this.GetAllParentTasks();
    this.GetAllProjects();
    this.GetAllUsers();
  }
  //Get All Tasks

  GetAllTasks(): void {
    this.sharedService.GetAllTasks().subscribe(
      data => {
        this.tasks = data;
      },
      (error) => { console.log(error); }
    );
  }
//Get All Parent Tasks
  GetAllParentTasks(): void {
    this.sharedService.GetAllParentTasks().subscribe(
      data => {
        this.parentTasks = data;
      },
      (error) => { console.log(error); }
    );
  }
//Get All Projects
  GetAllProjects(): void {
    this.sharedService.GetAllProjects().subscribe(
      data => {
        this.projects = data;
      },
      (error) => { console.log(error); }
    );
  }
//Get All Users
  GetAllUsers(): void {
    this.sharedService.GetAllUsers().subscribe(
      data => {
        this.users = data;
      },
      (error) => { console.log(error); }
    );
  }

  OpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  CloseModal() {
    this.modalRef.hide();
  }

  SelectedParent(task: Task): void {
    this.task.ParentId = task.TaskId;
    this.parentTask = task.TaskName;
    this.CloseModal();
  }

  SelectedProject(project: Project): void {
    this.task.ProjectId = project.ProjectId;
    this.projectName = project.ProjectName;
    this.CloseModal();
  }

  SelectedUser(user: User): void {
    this.task.UserId = user.UserId;
    this.userName = user.FirstName + ', ' + user.LastName;
    this.CloseModal();
  }

  AddTask() {
    if(!this.PerformValidations())
    {
      return;
    }
    this.task.TaskId = 0;
    this.task.isParentTask = this.isParentTask;
    if(this.isParentTask)
    {
      this.sharedService.AddParentTask(this.task).subscribe(data => {
        alert("Parent Task added!");
        this.router.navigate(['/ViewTask']);
      },
        (error) => { console.log(error); }
      );
    }
    else
    {
    this.sharedService.AddTask(this.task).subscribe(data => {
      alert("Task added!");
      this.router.navigate(['/ViewTask']);
    },
      (error) => { console.log(error); }
    );
  }
  }

  PerformValidations(): boolean{
    if(!this.task.ProjectId)
    {
      alert("Tag the task to a Project");
      return false;
    }
    if((!this.task.TaskName) || this.task.TaskName.trim().length == 0)
    {
      alert("Enter Value in the Task Name");
      return false;
    }
    if(this.task.ProjectStartDate >= this.task.ProjectEndDate)
    {
      alert("End date should be greater than the start date");
      return false;
    }
    if(!this.task.UserId)
    {
      alert("Tag the task to a User");
      return false;
    }  
    return true;
  }

  Reset(): void {
    this.task = {
      TaskId: null,
      TaskName: null,
      ProjectId: null,
      ParentId: null,
      UserId: null,
      Parent: null,
      Priority: null,
      ProjectStartDate: null,
      ProjectEndDate: null,
      isParentTask: false,
      Status:true
    }
    this.projectName = '';
    this.isParentTask = false;
    this.parentTask = '';
    this.task.Priority = 0;
  }

}
