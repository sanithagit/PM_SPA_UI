export class Task {
    TaskId: number;
    TaskName: string;
    ParentId: number;
    ProjectId: number;
    UserId:number;
    Parent: Task;
    ProjectStartDate: Date;
    ProjectEndDate: Date;
    Priority: number;
    isParentTask: boolean; 
    Status:boolean;
}
