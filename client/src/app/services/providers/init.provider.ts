import { Provider, APP_INITIALIZER } from '@angular/core';
import * as WebFonts from 'webfontloader';

export async function initFonts(): Promise<any> {
    return new Promise((resolve, reject) => {
        WebFonts.load({
            google: {
                families: ['PT Sans Narrow', 'Amatic SC']
            },
            active: () => {
                console.warn('Font was rendered!');
                resolve();
            },
            fontinactive: () => reject(),
            inactive: () => reject()
        });
    });
}

export const INIT_FONTS: Provider = {
    provide: APP_INITIALIZER,
    useFactory: initFonts,
    multi: true
};
