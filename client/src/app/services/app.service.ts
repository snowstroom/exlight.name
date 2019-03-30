import { Injectable, HostListener } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {
    private scroll = new Subject<number>();

    constructor() {
        addEventListener('scroll', this.windowScroll.bind(this));
    }

    get $scroll(): Observable<number> {
        return this.scroll.asObservable();
    }

    private windowScroll(): void {
        this.scroll.next(scrollY);
    }
}
