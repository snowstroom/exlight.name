import { Provider } from '@angular/compiler/src/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '../interseptors/token-interseptor.service';

export const INTERSEPTOR: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
};
