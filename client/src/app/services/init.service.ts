import * as WebFonts from 'webfontloader';
import { Injectable } from '@angular/core';

@Injectable()
export class InitService {
    public initFonts(): Promise<void> {
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
}
