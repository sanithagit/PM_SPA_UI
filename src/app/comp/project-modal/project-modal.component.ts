import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})
export class ProjectModalComponent implements OnInit {

  @Input() projects: Project[];
  @Output() selectedProj: EventEmitter<Project> = new EventEmitter();
  filteredProjects: Project[];
  selectedProject: Project;

  filterProjectName: string;
  private _projectName: string;
  get projectName(): string {
    return this._projectName;
  }
  set projectName(value: string) {
    this._projectName = value;
    this.FilterTasks();
  }

  constructor() { }

  ngOnInit() {
    this.filteredProjects = this.projects;
  }
 //Filter Tasks Method
  FilterTasks(): void{
    this.filterProjectName = (this._projectName) ? this._projectName : "";
    this.filteredProjects = this.projects.filter(m =>
      m.ProjectName.toLowerCase().indexOf(this.filterProjectName.toLowerCase()) !== -1)
  }
//Select Project Method
  SelectProject():void{
    this.selectedProj.next(this.selectedProject);
  }
}
