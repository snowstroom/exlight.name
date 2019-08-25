import { Component, OnDestroy } from '@angular/core';
import { RegistrationService } from '@app/services/registration.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    templateUrl: 'registration-confirm.page.html',
})
export class RegistrationConfirmPage implements OnDestroy {
    public success: boolean;
    private subsciber = new Subject();
    constructor(
        private regSrv: RegistrationService,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.pipe(takeUntil(this.subsciber))
            .subscribe(async (params: any) => this.confirmReg(params.hash));
    }

    public ngOnDestroy(): void {
        this.subsciber.next(null);
        this.subsciber.complete();
    }

    private async confirmReg(hash: string): Promise<void> {
        console.warn(hash);
        this.success = await this.regSrv.confirm(hash);
    }
}
