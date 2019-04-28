export class PaginationItem {
    public url: string[];
    public orderNumber: number;

    constructor(template: string = '', orderNumber: number) {
        this.url = ['/', ...template.replace('%', `${orderNumber}`).split('/')];
        this.orderNumber = orderNumber;
    }
}
