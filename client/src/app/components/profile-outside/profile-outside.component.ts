import { Component, OnDestroy } from '@angular/core';
import { ProfileService } from '@account-module/services/profile.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserApi } from '@account-module/models/api/user';

@Component({
  selector: 'ex-profile-outside',
  templateUrl: 'profile-outside.component.html',
  styleUrls: ['profile-outside.component.scss'],
})
export class ProfileOutsideComponent implements OnDestroy {
  public user: UserApi;
  private subscriber = new Subject();

  constructor(private profileSrv: ProfileService) {
    this.profileSrv.$user
      .pipe(takeUntil(this.subscriber))
      .subscribe(user => (this.user = user));
  }

  public ngOnDestroy(): void {
    this.subscriber.next(null);
    this.subscriber.complete();
    this.subscriber.unsubscribe();
  }
}
