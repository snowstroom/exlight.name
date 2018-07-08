import { Component, OnInit } from '@angular/core';
import { CategoriesApiData } from '../../interfaces/CategoriesApiData.interface';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-catalog-menu',
  templateUrl: './catalog-menu.component.html',
  styleUrls: ['./catalog-menu.component.scss']
})
export class CatalogMenuComponent implements OnInit {
  public selectCat: number = null;
  public categories: CategoriesApiData[] = [];

  constructor(
    private apiService: AppStateService
  ) { }

  ngOnInit() {
    this.apiService.categories$.subscribe(categories => this.categories = categories);
  }

  public selectCategory(i: number) {
    this.selectCat = i;
  }
}
