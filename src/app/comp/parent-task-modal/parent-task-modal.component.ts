import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-parent-task-modal',
  templateUrl: './parent-task-modal.component.html',
  styleUrls: ['./parent-task-modal.component.css']
})
export class ParentTaskModalComponent implements OnInit {


  @Input() tasks: Task[];
  @Output() selectedParent: EventEmitter<Task> = new EventEmitter();
  filteredTasks: Task[];
  selectedTask: Task;

  filterTaskName: string;
  private _taskName: string;
  get taskName(): string {
    return this._taskName;
  }
  set taskName(value: string) {
    this._taskName = value;
    this.FilterTasks();
  }

  constructor() { }

  ngOnInit() {
    this.filteredTasks = this.tasks;
  }
//Task Filter Method
  FilterTasks(): void{
    this.filterTaskName = (this._taskName) ? this._taskName : "";
    this.filteredTasks = this.tasks.filter(m =>
      m.TaskName.toLowerCase().indexOf(this.filterTaskName.toLowerCase()) !== -1)
  }
//Task Select Method
  SelectTask():void{
    this.selectedParent.next(this.selectedTask);
  }

}
