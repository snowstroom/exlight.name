export interface ICarouselItem {
    id: number;
    title: string;
    description: string;
    imgUrl: string;
}

export class CarouselItem implements ICarouselItem {
    public readonly id: number = this.__data.id;
    public title: string = this.__data.title;
    public description: string = this.__data.description;
    public imgUrl: string = this.imgUrl;

    constructor(private __data: ICarouselItem) {}
}
