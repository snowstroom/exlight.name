import { Component, OnDestroy } from '@angular/core';
import { PROFILE_SECTIONS } from '@account-module/consts/account-sections';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { ProfileService } from '@account-module/services/profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserApi } from '@account-module/models/api/user';

@Component({
  selector: 'ex-profile-editor',
  styleUrls: ['profile-editor.page.scss'],
  templateUrl: 'profile-editor.page.html',
})
export class ProfileEditorPage implements OnDestroy {
  public readonly MENU_ITEMS = PROFILE_SECTIONS;
  public form = new FormGroup({
    firstname: new FormControl(null, [Validators.required]),
    secondname: new FormControl(null, [Validators.required]),
  });
  private subscriber = new Subject();

  constructor(private profileSrv: ProfileService) {
    this.profileSrv.$user
      .pipe(takeUntil(this.subscriber))
      .subscribe(user => this.init(user));
  }

  get firstname(): FormControl {
    return this.form.get('firstname') as FormControl;
  }

  get secondname(): FormControl {
    return this.form.get('secondname') as FormControl;
  }

  public async saveProfile(): Promise<void> {
    if (this.form.valid) {
      await this.profileSrv.updateProfile({
        firstname: this.form.get('firstname').value,
        secondname: this.form.get('secondname').value,
      });
    }
  }

  public ngOnDestroy(): void {
    this.subscriber.next(null);
    this.subscriber.complete();
    this.subscriber.unsubscribe();
  }

  private init(user: UserApi): void {
    if (user) {
      this.firstname.setValue(user.firstname);
      this.secondname.setValue(user.secondname);
    }
  }
}
