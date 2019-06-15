import * as WebFonts from 'webfontloader';
import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ArticleService } from '../../article-module/services/article.service';

@Injectable()
export class InitService {

  constructor(
    private metaSrv: Meta,
    private articleSrv: ArticleService
  ) { }

  public async initApplication(): Promise<any> {
    this.initMeta();
    return Promise.all([this.initFonts(), this.articleSrv.getCategories()]);
  }

  private async initFonts(): Promise<any> {
    return new Promise((resolve, reject) => {
      WebFonts.load({
        google: {
          families: ['PT Sans Narrow', 'Amatic SC']
        },
        active: () => resolve(),
        fontinactive: () => reject(),
        inactive: () => reject()
      });
    });
  }

  private initMeta(): void {
    this.metaSrv.addTags([{
      name: 'description'
    }, {
      name: 'keywords'
    }, {
      name: 'author',
      content: 'Керничный Андрей'
    }, {
      name: 'copyright',
      content: 'eXlight'
    }]);
  }
}
