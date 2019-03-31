import { Component } from '@angular/core';
import { ApplicationService } from '@app/services/app.service';

@Component({
    selector: 'ex-share-content',
    templateUrl: 'share-content.component.html',
    styleUrls: ['share-content.component.scss']
})
export class ShareContentComponent {
    public visibleShare = false;

    constructor(private appSrv: ApplicationService) {
        this.appSrv.$shareState.subscribe(state => this.visibleShare = state);
    }
}
