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
  private subscriber = new Subject();
  constructor(
    private regSrv: RegistrationService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params
      .pipe(takeUntil(this.subscriber))
      .subscribe(async (params: any) => this.confirmReg(params.hash));
  }

  public ngOnDestroy(): void {
    this.subscriber.next(null);
    this.subscriber.complete();
  }

  private async confirmReg(hash: string): Promise<void> {
    console.warn(hash);
    this.success = await this.regSrv.confirm(hash);
  }
}
