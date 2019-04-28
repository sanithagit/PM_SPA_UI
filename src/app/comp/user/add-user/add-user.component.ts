import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { UserComponent } from 'src/app/comp/user/user.component';
import { ServiceService } from 'src/app/services/service.service';
 
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

 
 
  constructor(public service: ServiceService,public userDet:UserComponent) { 
    
  }

  ngOnInit() {
  }
 

  Reset(): void {
    this.userDet.user =
      {
        UserId: null,
        FirstName: null,
        LastName: null,
        EmployeeId: null
      }
    this.userDet.title = 'Add';
  }



  OnSubmit() { alert("fromui");  
    if (this.userDet.title == 'Add') {
      this.userDet.user.UserId =0;
      this.service.AddUser(this.userDet.user).subscribe(data => { alert("User added!"); this.Reset();this.userDet.GetAllUsers();},
      (error) => { console.log(error);}
      );
    }
    else {
      this.service.UpdateUser(this.userDet.user).subscribe(data => { alert("User updated!");this.Reset();this.userDet.GetAllUsers(); },
      (error) => { console.log(error); }
      );
    }
  }

  


}
