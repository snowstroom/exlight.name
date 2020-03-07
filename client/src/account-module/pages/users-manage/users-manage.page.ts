import { Component, OnInit } from '@angular/core';
import { ProfileService } from '@account-module/services/profile.service';
import { TableModel } from '@core/classes/table';
import { UserApi } from '@account-module/models/api/user';
import { PaginationParams } from '@core/classes';

@Component({
  templateUrl: 'users-manage.page.html',
})
export class UserManagePage implements OnInit {
  public table = new TableModel<UserApi>([], {});
  public pagination = new PaginationParams({ limit: 10 });

  constructor(private profileSrv: ProfileService) {}

  public async ngOnInit(): Promise<void> {
    const users = await this.profileSrv.getUsers(this.pagination);
    this.table = new TableModel(users, {
      email: 'Email',
      firstname: 'Имя',
      secondname: 'Фамилия',
    });
  }
}
