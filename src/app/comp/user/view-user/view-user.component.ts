import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { UserComponent } from 'src/app/comp/user/user.component';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
   
   
    filterUserName: string;
    private _userName: string;
    get UserName(): string {
      return this._userName;
    }
    set UserName(value: string) {
      this._userName = value;
      this.FilterUsers();
    }

    constructor(public service: ServiceService,public userDet:UserComponent) { }

  ngOnInit() {
    this.userDet.GetAllUsers();
  }
  


  UpdateUser(id: number): void {
    this.userDet.title = 'Update';
    this.userDet.user =  this.userDet.users.filter(m => m.UserId == id)[0];

  }

  FilterUsers(): void {
    this.filterUserName = (this._userName) ? this._userName : "";
    this.userDet.filteredUsers =  this.userDet.users.filter(m =>
      m.FirstName.toLowerCase().indexOf(this.filterUserName.toLowerCase()) !== -1 ||
      m.LastName.toLowerCase().indexOf(this.filterUserName.toLowerCase()) !== -1)
  }

  DeleteUser(id: number) {
    this.service.DeleteUser(id).subscribe(data => {
      alert("User is deleted!");
      this.userDet.GetAllUsers();
    },
      (error) => { console.log(error); })
  }

  
  SortByFirstName(): void {
    this.userDet.filteredUsers = this.userDet.filteredUsers.sort(function (a, b) {
      if (a.FirstName >= b.FirstName)
        return 1;
      else
        return -1;
    });
  }

  SortByLastName(): void {
    this.userDet.filteredUsers = this.userDet.filteredUsers.sort(function (a, b) {
      if (a.LastName >= b.LastName)
        return 1;
      else
        return -1;
    });
  }

  SortById(): void {
    this.userDet.filteredUsers = this.userDet.filteredUsers.sort(function (a, b) {
      return (a.EmployeeId - b.EmployeeId)
    });
  }


}
 