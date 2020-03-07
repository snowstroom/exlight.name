import { Component, OnInit } from '@angular/core';
import { ACCESSES_SECTION } from '@account-module/consts/account-sections';

@Component({
  templateUrl: 'access-manage.page.html',
})
export class AccessManagePage implements OnInit {
  public readonly MENU_ITEMS = ACCESSES_SECTION;

  public async ngOnInit(): Promise<void> {}
}
