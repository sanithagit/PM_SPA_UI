import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ServiceService } from 'src/app/services/service.service';
import { ProjectComponent } from 'src/app/comp/project/project.component';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {




 
 modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private service: ServiceService,private projDet:ProjectComponent) { }

  ngOnInit() { 
    const today = new Date();
    this.projDet.project.ProjectStartDate = today;
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    this.projDet.project.ProjectEndDate = tomorrow;
    this.projDet.project.ProjectPriority = 0;   
    this.GetAllUsers();
  }



  GetAllUsers(): void { 
    this.service.GetAllUsers().subscribe(
      data => {
        this.projDet.users = data;
      },
      (error) => { console.log(error); }
    );
  }



  OnSubmit() {
//    if (!this.PerformValidations()) {
  //    return;
    //}
    if (this.projDet.isDatesIncluded == false) {
      this.projDet.project.ProjectStartDate = null;
      this.projDet.project.ProjectEndDate = null;
    }
    if (this.projDet.title == 'Add') {
      this.projDet.project.ProjectId = 0;
      this.service.AddProject(this.projDet.project).subscribe(data => { alert("Project added!"); this.Reset();this.projDet.GetAllProjects(); },
        (error) => { console.log(error); }
      );
    }
    else {
      this.service.UpdateProject(this.projDet.project).subscribe(data => { alert("Project updated!");this.Reset();this.projDet.GetAllProjects(); },
        (error) => { console.log(error); }
      );
    }
  }

  
  OpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  CloseModal() {
    this.modalRef.hide();
  }

  SelectedUser(user: User): void {
    this.projDet.project.ProjectUserId = user.UserId;
    this.projDet.projectManager = user.FirstName + ', ' + user.LastName;
    this.CloseModal();
  }

  Reset(): void {
    this.projDet.project =
      {
        ProjectId: null,
        ProjectName: null,
        ProjectStartDate: null,
        ProjectEndDate: null,
        ProjectPriority: null,
        ProjectUserId: null,
        ProjectTotalTasks: null,
        ProjectTasksCompleted: null
      }
      const today = new Date();
    this.projDet.project.ProjectStartDate = today;
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    this.projDet.project.ProjectEndDate = tomorrow;
    this.projDet.project.ProjectPriority = 0;   
    this.projDet.isDatesIncluded = false;
    this.projDet.projectManager = '';
    //this.projDet.projectName = '';
    this.projDet.title = 'Add';
  }

}
