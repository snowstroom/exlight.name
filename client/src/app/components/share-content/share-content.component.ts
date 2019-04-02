import { Component } from '@angular/core';
import { ApplicationService, IShareButton } from '@app/services/app.service';

@Component({
    selector: 'ex-share-content',
    templateUrl: 'share-content.component.html',
    styleUrls: ['share-content.component.scss']
})
export class ShareContentComponent {
    public shareButtons: IShareButton[];
    public visibleShare = false;

    constructor(private appSrv: ApplicationService) {
        this.appSrv.$shareState.subscribe(state => this.visibleShare = state);
        this.appSrv.$shareButtons.subscribe(btns => this.shareButtons = btns);
    }

    public share(url: string): void {
        open(url, 'blank');
    }
}
