export class PaginationItem {
    public url: string[];
    public orderNumber: number;
    public link: HTMLLinkElement;

    constructor(template: string = '', orderNumber: number) {
        this.url = ['/', ...template.replace('%', `${orderNumber}`).split('/')];
        this.orderNumber = orderNumber;
    }
}
