 import { Component, OnInit } from '@angular/core';

import { DataSourceUser } from './data-source';
import { UsersService } from '@services/users.service';
import { ResponseUsers } from '@models/user.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit    {

  dataSource = new DataSourceUser();
  user: ResponseUsers | null = null;
  columns: string[] = ['id', 'avatar', 'name', 'email'];

  constructor(
    private usersService: UsersService,
    private authService: AuthService
    ) {}

  ngOnInit(): void {
    this.usersService.getUsers()
    .subscribe(users =>{
      this.dataSource.init(users)
    })
    this.authService.user$
    .subscribe(data =>{
      this.user = data;
    })
  }
}
