import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegistrationService } from '@app/services/registration.service';

@Component({
    templateUrl: 'authorization.page.html',
    styleUrls: ['authorization.page.scss']
})

export class AuthorizationComponent {
    public form = new FormGroup({
        email: new FormControl(),
        password: new FormControl(),
    });

    constructor(private registrationSrv: RegistrationService) { }

    public async submit(): Promise<void> {
        const { email, password } = this.form.value;
        this.registrationSrv.auth(email, password);
    }
}
