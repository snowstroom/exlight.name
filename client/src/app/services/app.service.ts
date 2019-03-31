import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {
    private scroll = new Subject<number>();
    private share = new  BehaviorSubject<boolean>(false);
    private scrollProgress = new BehaviorSubject<boolean>(false);

    constructor() {
        addEventListener('scroll', this.windowScroll.bind(this));
    }

    public static scrollPageToPrecent(scroll: number): number {
        return scroll * 100 / (document.body.scrollHeight - innerHeight);
    }

    public static scrollPrecentToPX(precent: number): number {
        return (document.body.scrollHeight - innerHeight) * precent / 100;
    }

    get $scroll(): Observable<number> {
        return this.scroll.asObservable();
    }

    get $shareState(): Observable<boolean> {
        return this.share.asObservable();
    }

    get $scrollProgressState(): Observable<boolean> {
        return this.scrollProgress.asObservable();
    }

    public showShareBlock(): void {
        this.share.next(true);
    }

    public hideShareBlock(): void {
        this.share.next(false);
    }

    public showScrollProgress(): void {
        this.scrollProgress.next(true);
    }

    public hideScrollProgress(): void {
        this.scrollProgress.next(false);
    }

    private windowScroll(): void {
        this.scroll.next(scrollY);
    }
}
