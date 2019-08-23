export interface ICarouselItem {
    title: string;
    route: string;
    description: string;
    carouselImg: string;
}

export class CarouselItem implements ICarouselItem {
    public title: string = this.__data.title;
    public route: string = this.__data.route;
    public description: string = this.__data.description;
    public carouselImg: string = this.__data.carouselImg;

    constructor(private __data: ICarouselItem) {}
}
