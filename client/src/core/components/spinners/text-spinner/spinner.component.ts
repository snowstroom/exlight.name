import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'ex-spinner',
    styleUrls: ['spinner.component.scss'],
    templateUrl: 'spinner.component.html'
})
export class SpinnerComponent implements OnInit, OnDestroy {
    public visibleText: string;
    public spinnerText = '...';
    @Input() public wait: boolean;
    private curLit = 0;
    private timer: NodeJS.Timer;

    public ngOnInit(): void {
        this.timer = setInterval(() => {
            this.visibleText = `${this.spinnerText.slice(0, this.curLit)} _`;
            if (this.curLit <= this.spinnerText.length) {
                this.curLit++;
            } else {
                this.visibleText = '';
                this.curLit = 0;
            }
        }, 300);
    }

    public ngOnDestroy(): void {
        clearInterval(this.timer);
    }

}
