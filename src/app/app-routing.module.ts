import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTaskComponent } from 'src/app/comp/add-task/add-task.component';
import { ProjectComponent } from 'src/app/comp/project/project.component';
import { UserComponent } from 'src/app/comp/user/user.component';
import { ViewTaskComponent } from 'src/app/comp/view-task/view-task.component';
import { EditTaskComponent } from 'src/app/comp/edit-task/edit-task.component';

export const routes: Routes = [
  { path: '', redirectTo: '/ViewTask', pathMatch: 'full' },
  { path: 'AddTask', component: AddTaskComponent },
  { path: 'EditTask/:id', component: EditTaskComponent },
  { path: 'ViewTask', component: ViewTaskComponent },
  { path: 'User', component: UserComponent },
  { path: 'Project', component: ProjectComponent} 
  //{ path: 'EditTask', component: EditTaskComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],  
  exports: [RouterModule]
})
export class AppRoutingModule {}
