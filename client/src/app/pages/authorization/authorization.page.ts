import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/fontawesome-free-solid';
import { AuthService } from '@app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'authorization.page.html',
    styleUrls: ['authorization.page.scss']
})

export class AuthorizationComponent {
    public readonly EYE_ICO = faEye;
    public readonly EYE_SLASH_ICO = faEyeSlash;
    public hidePsw = true;

    public form = new FormGroup({
        email: new FormControl(),
        password: new FormControl(),
    });

    constructor(private authSrv: AuthService, private router: Router) { }

    public async submit(): Promise<void> {
        const { email, password } = this.form.value;
        const res = await this.authSrv.auth(email, password);
        if (res) {
            this.router.navigate(['/']);
        }
    }
}
