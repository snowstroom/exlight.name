import { IModel } from "../interfaces/model.inteface";

export interface ICarouselItemModel {
    id?: number;
    img_url: string;
    article_id: number;
    active: boolean;
}

export class CarouselItemModel implements ICarouselItemModel, IModel {
    public id: number = null;
    public img_url: string = null;
    public article_id: number = null;
    public active: boolean = false;

    constructor(data?: Partial<ICarouselItemModel>) {
        this.init(data);
    }

    public init(data?: Partial<ICarouselItemModel>): void {
        if (data) {
            this.id = data.id || null;
            this.img_url = data.img_url || null;
            this.article_id = data.article_id || null;
            this.active = data.active || false;
        }
    }

    public getInsertQuery(): string {
        return ``;
    }
}