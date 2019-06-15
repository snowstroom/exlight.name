import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { Provider } from '@angular/compiler/src/core';

function markedOptionsFactory(): MarkedOptions {
    const renderer = new MarkedRenderer();

    renderer.image = (href: string, title: string, text: string) => {
        if (title) {
            return `<div role="img" class="ex-img" style="background-image: url(${href})" title="${title}"></div>`;
        } else {
            return `<div role="img" class="ex-img" style="background-image: url(${href})"></div>`;
        }
    };

    return {
        renderer: renderer,
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: true,
        sanitize: false,
        smartLists: true,
        smartypants: true,
    };
};


export const MARKDOWN_PROVIDER: Provider = {
    provide: MarkedOptions,
    useFactory: markedOptionsFactory
};
