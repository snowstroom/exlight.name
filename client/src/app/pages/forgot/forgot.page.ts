import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegistrationService } from '@app/services/registration.service';

@Component({
    templateUrl: 'forgot.page.html',
    styleUrls: ['forgot.page.scss']
})

export class ForgotPassowrdComponent {
    public form = new FormGroup({
        email: new FormControl()
    });

    constructor(private registrationSrv: RegistrationService) { }

    public async submit(): Promise<void> {
        await this.registrationSrv.forgot(this.form.value.email);
    }
}
