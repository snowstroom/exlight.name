import { Component, OnInit } from '@angular/core';
import { CategoryApiService } from '@account-module/services/category.service';
import { TableModel } from '@core/classes/table';
import { CategoryApi } from '@account-module/models/api/category.api';

@Component({
  templateUrl: 'categories-manage.page.html',
})
export class CategoriesManagePage implements OnInit {
  public table: TableModel<CategoryApi> = new TableModel<CategoryApi>([], {});
  constructor(private catApiSrv: CategoryApiService) {}

  public async ngOnInit(): Promise<void> {
    const cats = await this.catApiSrv.getAllCategories();
    this.table = new TableModel<CategoryApi>(cats, {
      description: 'Описание',
      name: 'Имя',
      route: 'Маршрут',
    });
  }
}
