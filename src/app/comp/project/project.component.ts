import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { User } from 'src/app/models/user';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: Project[];
  filteredProjects: Project[];
  users: User[];

  project: Project =
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

  isDatesIncluded: boolean = false;
  projectManager: string; 
  title: string = 'Add';
  constructor(private service: ServiceService) { }

  ngOnInit() {
  }

  GetAllProjects(): void {
    this.service.GetAllProjects().subscribe(
      data => {
        this.projects = data;
        this.filteredProjects = data;
      },
      (error) => { console.log(error); }
    );
  }

}
