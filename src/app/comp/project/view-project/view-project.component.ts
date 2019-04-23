import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { ProjectComponent } from 'src/app/comp/project/project.component';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {


  filterProjectName: string;
  private _projectName: string;


  get projectName(): string {
    return this._projectName;
  }
  set projectName(value: string) {
    this._projectName = value;
    this.FilterProjects();
  }
  SortByStartDate(): void {
    this.projDet.filteredProjects = this.projDet.filteredProjects.sort(function (a, b) {
      if (a.ProjectStartDate >= b.ProjectStartDate)
        return 1;
      else
        return -1;
    });
  }

  SortByEndDate(): void {
    this.projDet.filteredProjects = this.projDet.filteredProjects.sort(function (a, b) {
      if (a.ProjectEndDate >= b.ProjectEndDate)
        return 1;
      else
        return -1;
    });
  }

  SortByPriority(): void {
    this.projDet.filteredProjects = this.projDet.filteredProjects.sort(function (a, b) {
      return (a.ProjectPriority - b.ProjectPriority)
    });
  }

  SortByCompleted(): void {
    this.projDet.filteredProjects = this.projDet.filteredProjects.sort(function (a, b) {
      if (a.ProjectEndDate >= b.ProjectEndDate)
        return -1;
      else
        return 1;
    });
  }

  FilterProjects(): void {
    this.filterProjectName = (this._projectName) ? this._projectName : "";
    this.projDet.filteredProjects = this.projDet.projects.filter(m =>
      m.ProjectName.toLowerCase().indexOf(this.filterProjectName.toLowerCase()) !== -1)
  }

  DeleteProject(id: number) {
    this.service.DeleteProject(id).subscribe(data => {
      alert("Project is deleted!");
      this.projDet.GetAllProjects();
    },
      (error) => { console.log(error); })
  }

  UpdateProject(id: number): void {
    this.projDet.title = 'Update';
    this.projDet.project=this.projDet.projects.filter(m => m.ProjectId == id)[0];
    if (this.projDet.project.ProjectStartDate)
    this.projDet.isDatesIncluded = true;
    this.LoadUserName();
  }

  LoadUserName(): void {
    this.service.GetAllUsers().subscribe(
      data => {
        this.projDet.users = data;
        this.projDet.projectManager = this.projDet.users.filter(m => m.UserId == this.projDet.project.ProjectUserId)[0].FirstName + ', ' + this.projDet.users.filter(m => m.UserId == this.projDet.project.ProjectUserId)[0].LastName;
      },
      (error) => { console.log(error); }
    );
  }


  constructor(private service: ServiceService,private projDet:ProjectComponent) { }

  ngOnInit() {
    this.projDet.GetAllProjects();
  }

}
