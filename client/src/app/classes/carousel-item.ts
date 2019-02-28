export interface ICarouselItem {
    id: number;
    title: string;
    data: string;
    urlImg: string;
}

export class CarouselItem implements ICarouselItem {
    public readonly id: number;
    public title: string;
    public data: string;
    public urlImg: string;

    constructor(private dataItem: ICarouselItem) {
        this.id = dataItem.id || null;
        this.title = dataItem.title || null;
        this.data = dataItem.data || null;
        this.urlImg = dataItem.urlImg || null;
    }
}
