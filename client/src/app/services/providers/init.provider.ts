import { Provider, APP_INITIALIZER } from '@angular/core';
import * as WebFonts from 'webfontloader';

const initFonts = async (): Promise<any> => {
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
};

const init = () => initFonts;

export const INIT_FONTS: Provider = {
    provide: APP_INITIALIZER,
    useFactory: init,
    multi: true
};
