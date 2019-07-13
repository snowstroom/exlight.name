import { Directive, ElementRef, Input } from '@angular/core';
import { AccessNamespace } from '@share/access.namespace';
import { AuthService } from '@app/services/auth.service';

@Directive({
    selector: '[exAccess]'
})
export class AccessDirective {
    @Input() public entity: AccessNamespace.E_ENTITY_TYPES;
    @Input() public access: number;

    constructor(
        private element: ElementRef,
        private authSrv: AuthService
    ) { }

}
