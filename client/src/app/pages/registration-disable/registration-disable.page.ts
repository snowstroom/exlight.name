import { Component, OnDestroy } from '@angular/core';
import { RegistrationService } from '@app/services/registration.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: 'registration-disable.page.html',
})
export class RegistrationDisablePage implements OnDestroy {
  public success: boolean;
  private subscriber = new Subject();
  constructor(
    private regSrv: RegistrationService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params
      .pipe(takeUntil(this.subscriber))
      .subscribe(async (params: any) => this.disableReg(params.hash));
  }

  public ngOnDestroy(): void {
    this.subscriber.next(null);
    this.subscriber.complete();
  }

  private async disableReg(hash: string): Promise<void> {
    console.warn(hash);
    this.success = await this.regSrv.disable(hash);
  }
}
