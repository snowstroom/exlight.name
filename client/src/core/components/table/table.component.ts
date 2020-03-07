import { Component, Input } from '@angular/core';
import { TableModel, E_SORT_TYPE } from '@core/classes/table';
import { PaginationParams } from '@core/classes';

@Component({
  selector: 'ex-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.scss'],
})
export class TableComponent<T> {
  public readonly SORT_TYPE = E_SORT_TYPE;
  public pagination = new PaginationParams({ limit: 1 });
  public tableModel: TableModel<T>;

  @Input() set model(val: TableModel<T>) {
    this.tableModel = val;
    this.pagination = new PaginationParams({
      total: val.items.length,
      limit: 10,
    });
  }
}
