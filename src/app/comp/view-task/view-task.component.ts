import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Task } from 'src/app/models/task';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { Project } from 'src/app/models/project';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  tasks: Task[];
  filteredTasks: Task[];
  projectName: string;
  currentDate: Date;
  projects: Project[];
  modalRef: BsModalRef;

  constructor(private router: Router, private sharedService: ServiceService, private modalService: BsModalService) { }

  ngOnInit() {
    this.currentDate = new Date();
    this.GetAllTasks();
    this.GetAllProjects();
  }

//Get All Tasks Method
  GetAllTasks(): void {
    this.sharedService.GetAllTasks().subscribe(
      data => {
        this.tasks = data;
        this.filteredTasks = data;
      },
      (error) => { console.log(error); }
    );
  }
//Get All Projects Method
  GetAllProjects(): void {
    this.sharedService.GetAllProjects().subscribe(
      data => {
        this.projects = data;
      },
      (error) => { console.log(error); }
    );
  }
//End Task Method
  EndTask(id: number) {  
    this.sharedService.EndTask(id).subscribe(data => {
      alert("Task ended!");
      this.Refresh();
    },
      (error) => { console.log(error); }
    )
  }
//Delete Task Method
  DeleteTask(id: number) {
    this.sharedService.DeleteTask(id).subscribe(data => {
      alert("Task is deleted!");
      this.Refresh();
    },
      (error) => { console.log(error); })
  }

  OpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  CloseModal() {
    this.modalRef.hide();
  }

  Refresh(): void {
    window.location.reload(true);
  }
//Selected Project Method
  SelectedProject(project: Project): void {
    this.projectName = project.ProjectName;
    this.filteredTasks = this.tasks.filter(m => m.ProjectId == project.ProjectId);
    this.CloseModal();
  }
//Sort by start date Method
  SortByStartDate(): void {
    this.filteredTasks = this.filteredTasks.sort(function (a, b) {
      if (a.ProjectStartDate >= b.ProjectStartDate)
        return 1;
      else
        return -1;
    });
  }
//Sort by end date Method
  SortByEndDate(): void {
    this.filteredTasks = this.filteredTasks.sort(function (a, b) {
      if (a.ProjectEndDate >= b.ProjectEndDate)
        return 1;
      else
        return -1;
    });
  }
//Sort by Priority Method

  SortByPriority(): void {
    this.filteredTasks = this.filteredTasks.sort(function (a, b) {
      return (a.Priority - b.Priority)
    });
  }
//Sort by Completed Method

  SortByCompleted(): void {
    this.filteredTasks = this.filteredTasks.sort(function (a, b) {
      if (a.ProjectEndDate >= b.ProjectEndDate)
        return -1;
      else
        return 1;
    });
  }
//Route to Edit Task

EditTask(id: number) {
    this.router.navigate(['/EditTask', id])
  }

}
