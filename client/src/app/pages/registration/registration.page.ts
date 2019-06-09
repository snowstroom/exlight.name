import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from '@app/services/registration.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'registration.page.html',
    styleUrls: ['registration.page.scss']
})

export class RegistrationComponent {
    public form = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    });

    constructor(
        private registrationSrv: RegistrationService,
        private router: Router,
    ) { }

    public async submit(): Promise<void> {
        const { email, password } = this.form.value;
        await this.registrationSrv.registration(email, password);
        this.router.navigate(['/']);
    }
}
