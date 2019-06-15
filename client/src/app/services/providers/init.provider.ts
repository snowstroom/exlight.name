import { Provider, APP_INITIALIZER } from '@angular/core';
import { InitService } from '../init.service';

export const INIT_PROVIDER: Provider = {
    provide: APP_INITIALIZER,
    useFactory: (srv: InitService) => async () => srv.initApplication(),
    deps: [InitService],
    multi: true
};
