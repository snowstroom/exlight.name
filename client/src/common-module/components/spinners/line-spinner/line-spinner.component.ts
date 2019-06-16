import { Component, Input } from '@angular/core';

@Component({
    selector: 'ex-line-spinner',
    styleUrls: ['line-spinner.component.scss'],
    templateUrl: 'line-spinner.component.html'
})
export class LineSpinnerComponent {
    @Input() public wait: boolean;
}
