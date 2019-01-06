export interface ISliderItem {
    id: number;
    title: string;
    data: string;
    urlImg: string;
}

export class SliderItem implements ISliderItem {
    public readonly id: number;
    public title: string;
    public data: string;
    public urlImg: string;

    constructor(private dataItem: ISliderItem) {
        this.id = dataItem.id || null;
        this.title = dataItem.title || null;
        this.data = dataItem.data || null;
        this.urlImg = dataItem.urlImg || null;
    }
}
