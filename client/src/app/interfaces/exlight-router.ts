import { Route } from '@angular/router';

export interface IExlightRoute extends Route {
    data?: IRouteMetadata;
}

export interface IRouteMetadata {
    showAside: boolean;
    haveNoBackground?: boolean;
}
