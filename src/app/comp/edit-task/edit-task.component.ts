import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Task } from 'src/app/models/task';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { User } from 'src/app/models/user';
import { Project } from 'src/app/models/project';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

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
  parentTasks: Task[];
  projectName: string;
  isParentTask: boolean;
  parentTask: string;
  userName: string;
  users: User[];
  projects: Project[];

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService,private location: Location, private route: ActivatedRoute, private sharedService: ServiceService, private router: Router) { }

  ngOnInit() {
    this.GetAllTasks();
    this.GetAllParentTasks();
    this.GetAllUsers();
  }
 //Get Task by Id
  getTask(): void {
    const id =+this.route.snapshot.paramMap.get('id');
    this.task = this.tasks.filter(m=> m.TaskId == id)[0];
    this.GetAllProjects();
    this.LoadParentTask();
    this.LoadUserName();
  }
//Get All Projects
  GetAllProjects(): void {
    this.sharedService.GetAllProjects().subscribe(
      data => {
        this.projects = data;
        this.projectName = this.projects.filter(m=>m.ProjectId == this.task.ProjectId)[0].ProjectName;
      },
      (error) => { console.log(error); }
    );
  }
//Get All Tasks
  GetAllTasks(): void {
    this.sharedService.GetAllTasks().subscribe(
      data => {
        this.tasks = data;
        this.getTask();
      },
      (error) => { console.log(error); }
    );
  }

  LoadParentTask(): void {
    this.sharedService.GetAllParentTasks().subscribe(
      data => {
        this.parentTasks = data;
        if(this.task.ParentId)
        this.parentTask = this.parentTasks.filter(m=> m.TaskId == this.task.ParentId)[0].TaskName;
      },
      (error) => { console.log(error); }
    );
  }

  LoadUserName(): void {
    this.sharedService.GetAllUsers().subscribe(
      data => {//alert(this.task.TaskName);
        this.users = data;
       // this.task.UserId = this.tasks.filter(m=> m.TaskId == this.task.TaskId)[0].UserId;
        this.userName = this.users.filter(m=> m.UserId == this.task.UserId)[0].FirstName + ', '
        +this.users.filter(m=> m.UserId == this.task.UserId)[0].LastName;
      },
      (error) => { console.log(error); }
    );
    //this.userName="abcd";
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
//Get All Users 
  GetAllUsers(): void {
    this.sharedService.GetAllUsers().subscribe(
      data => {
        this.users = data;
      },
      (error) => { console.log(error); }
    );
  }
//Update Existing Task
  UpdateTask(): void {
    if(!this.ValidatePage())
    {
      return;
    }
    this.sharedService.UpdateTask(this.task).subscribe(
      data=> {alert("Task updated!"); 
      this.router.navigate(['/viewTask']);},
      (error) => { console.log(error); }
    );
  }
  ValidatePage(): boolean{
    if(!this.task.ProjectId)
    {
      alert("Select Project");
      return false;
    }
    if((!this.task.TaskName) || this.task.TaskName.trim().length == 0)
    {
      alert("Please provide Task Name");
      return false;
    }
    if(this.task.ProjectStartDate >= this.task.ProjectEndDate)
    {
      alert("End date should be greater than the start date");
      return false;
    }
    if(!this.task.UserId)
    {
      alert("Select User- Task Manager ");
      return false;
    }  
    return true;
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

  SelectedUser(user: User): void{
    this.task.UserId = user.UserId;
    this.userName= user.FirstName + ', ' + user.LastName;
    this.CloseModal();
  }

  Cancel(): void {
    this.location.back();
  }


}
