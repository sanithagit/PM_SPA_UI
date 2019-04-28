import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError as observableThrowError } from 'rxjs';
import { Task } from 'src/app/models/task';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  

  constructor(private httpClient: HttpClient) { }

  rootURL: string = "http://172.18.3.184/PMSPAServices/api/PM/";
  //rootURL: string = "http://localhost:10088/api/PM/";

   
  //Get All Tasks call to Web API
  GetAllTasks(): Observable<Task[]>
  {
    const URL = this.rootURL.concat("GetAllTasks");
    return this.httpClient.get<Task[]>(URL)
    .pipe(catchError(this._ErrorHandler));
  }
//Get All Parent Tasks call to Web API
  GetAllParentTasks(): Observable<Task[]>
  {
    const URL = this.rootURL.concat("GetAllParentTasks");
    return this.httpClient.get<Task[]>(URL)
    .pipe(catchError(this._ErrorHandler));
  }
//Get All Projects call to Web API

  GetAllProjects(): Observable<Project[]>
  {
    const URL = this.rootURL.concat("GetAllProjects");
    return this.httpClient.get<Project[]>(URL)
    .pipe(catchError(this._ErrorHandler));
  }
//Get All Users call to Web API

  GetAllUsers(): Observable<User[]>
  {
    const URL = this.rootURL.concat("GetAllUsers");
    return this.httpClient.get<User[]>(URL)
    .pipe(catchError(this._ErrorHandler));
  }

  //Add New Task call to Web API

  AddTask(task: Task): Observable<void>
  {
    const URL = this.rootURL.concat("AddTask");
    return this.httpClient.post<void>(URL,task)
    .pipe(catchError(this._ErrorHandler));
  }

  AddParentTask(task: Task): Observable<void>
  {
    const URL = this.rootURL.concat("AddParentTask");
    return this.httpClient.post<void>(URL,task)
    .pipe(catchError(this._ErrorHandler));
  }

  //Add New Project call to Web API

  AddProject(project: Project): Observable<void>
  {
    const URL = this.rootURL.concat("AddProject");
    return this.httpClient.post<void>(URL,project)
    .pipe(catchError(this._ErrorHandler));
  }
  //Add New User call to Web API

  AddUser(user: User): Observable<void>
  {
    const URL = this.rootURL.concat("AddUser");  
    return this.httpClient.post<void>(URL,user)
    .pipe(catchError(this._ErrorHandler));
  }
  //Update Existing Task call to Web API 

  UpdateTask(task: Task): Observable<void>
  {
    const URL = this.rootURL.concat("UpdateTask");
    return this.httpClient.put<void>(URL,task)
    .pipe(catchError(this._ErrorHandler));
  }
  //Update Existing Project call to Web API

  UpdateProject(project: Project): Observable<void>
  {
    const URL = this.rootURL.concat("UpdateProject");
    return this.httpClient.put<void>(URL,project)
    .pipe(catchError(this._ErrorHandler));
  }
  //Update Existing User call to Web API

  UpdateUser(user: User): Observable<void>
  {
    const URL = this.rootURL.concat("UpdateUser");  
    return this.httpClient.put<void>(URL,user)
    .pipe(catchError(this._ErrorHandler));
  }
  //Delete Existing Task call to Web API

  DeleteTask(id: number): Observable<void>
  {
    const URL = this.rootURL.concat("DeleteTask/",id.toString());
    return this.httpClient.delete<void>(URL)
    .pipe(catchError(this._ErrorHandler));
  }
 
  EndTask(id: number): Observable<void>
  {
    const URL = this.rootURL.concat("EndTask/",id.toString());
    return this.httpClient.put<void>(URL,id)
    .pipe(catchError(this._ErrorHandler));
  }
  //Update Existing Project call to Web API

  DeleteProject(id: number): Observable<void>
  {
    const URL = this.rootURL.concat("DeleteProject/",id.toString());
    return this.httpClient.delete<void>(URL)
    .pipe(catchError(this._ErrorHandler));
  }
  //Update Existing User call to Web API
 
  DeleteUser(id: number): Observable<void>
  {
    const URL = this.rootURL.concat("DeleteUser/",id.toString());
    return this.httpClient.delete<void>(URL)
    .pipe(catchError(this._ErrorHandler));
  }

  private _ErrorHandler(error: any): Observable<never>
  {
   if(error && error.error) 
   {
    return observableThrowError(error.error);
   }
   const errMsg=(error.message)? error.message : error.status ? '${error.status} - ${error.statusText}' : 'An unidentified error occurred.!';
   return observableThrowError(errMsg);
  }
}
