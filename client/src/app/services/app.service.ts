import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { EnviromentService } from './envirement.service';
import { Title, Meta } from '@angular/platform-browser';
import { VkShareButton, TwitterButton, FacebookButton, LinkedInButton, TelegramButton } from '@app/models/share-buttons';

export interface IPageDescription {
    title: string;
    description: string;
    keywords: string[];
    url: string;
    img: string;
}

export interface IShareButton {
    icon: string;
    url: string;
    update(desc: IPageDescription): void;
}

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {
    public pageDescription: IPageDescription;
    public sideNavIsShown = false;
    private scroll = new Subject<number>();
    private share = new  BehaviorSubject<boolean>(false);
    private scrollProgress = new BehaviorSubject<boolean>(false);
    private pageDescription$ = new Subject<IPageDescription>();
    private shareButtons = new BehaviorSubject<IShareButton[]>([]);
    private sideNavState = new BehaviorSubject<boolean>(false);
    private currentLdJsonSchema = new BehaviorSubject({});

    constructor(
        private envSrv: EnviromentService,
        private titleSrv: Title,
        private metaSrv: Meta
    ) {
        addEventListener('scroll', this.windowScroll.bind(this));
    }

    public setPageInfo(val: IPageDescription): void {
        this.pageDescription = val;
        this.pageDescription$.next(this.pageDescription);
        this.titleSrv.setTitle(`eXlight - ${this.pageDescription.title}`);
        this.metaSrv.updateTag({
            name: 'description',
            content: this.pageDescription.description
        });
        this.metaSrv.updateTag({
            name: 'keywords',
            content: this.pageDescription.keywords.join(',')
        });
        this.shareButtons.next([
            new VkShareButton(this.pageDescription),
            new TwitterButton(this.pageDescription),
            new FacebookButton(this.pageDescription),
            new LinkedInButton(this.pageDescription),
            new TelegramButton(this.pageDescription)
        ]);
    }

    get $pageDescription(): Observable<IPageDescription> {
        return this.pageDescription$.asObservable();
    }

    get $shareButtons(): Observable<IShareButton[]> {
        return this.shareButtons.asObservable();
    }

    get $ldJsonSchema(): Observable<any> {
        return this.currentLdJsonSchema.asObservable();
    }

    public hideSideNav(): void {
        this.sideNavIsShown = false;
        this.sideNavState.next(false);
    }

    public showSideNav(): void {
        this.sideNavIsShown = true;
        this.sideNavState.next(true);
    }

    public toogleSideNav(): void {
        this.sideNavIsShown = !this.sideNavIsShown;
        this.sideNavState.next(this.sideNavIsShown);
    }

    get $sideNavState(): Observable<boolean> {
        return this.sideNavState.asObservable();
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

    public setLdJsonShema(shema: any): void {
        this.currentLdJsonSchema.next(shema);
    }

    private windowScroll(): void {
        this.scroll.next(scrollY);
    }
}
