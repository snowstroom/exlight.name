import * as WebFonts from 'webfontloader';
import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable()
export class InitService {

  constructor(private metaSrv: Meta) { }
    public initFonts(): Promise<void> {
      this.initMeta();
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
