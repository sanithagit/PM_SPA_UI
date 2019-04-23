import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  title: string = 'Add';
  user: User =
  {
    UserId: null,
    FirstName: null,
    LastName: null,
    EmployeeId: null
  }
  users: User[];
  filteredUsers: User[];

  constructor(private service: ServiceService) { }

  GetAllUsers(): void {
    this.service.GetAllUsers().subscribe(
      data => {
        this.users = data;
        this.filteredUsers = data;
      },
      (error) => { console.log(error); }
    );
  }

  ngOnInit() {
  }

}
