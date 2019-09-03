import { Provider } from '@angular/compiler/src/core';
import { LOCALE_ID } from '@angular/core';

export const LOCALE: Provider = { provide: LOCALE_ID, useValue: 'ru' };