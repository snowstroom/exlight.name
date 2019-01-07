import { DbModel } from "../classes/db-model.class";
import { IDataModel } from "../interfaces/model.inteface";
import { CAROUSEL_ITEMS } from '../consts/tables.const';

export interface ICarouselItemModel {
    id?: number;
    img_url: string;
    article_id: number;
    active: boolean;
}

export class CarouselItemModel extends DbModel {
    public id: number = null;
    public tableName: string = CAROUSEL_ITEMS;
    public data: IDataModel = {
        img_url: null,
        article_id: null,
        active: false
    }
    
    constructor(data?: Partial<ICarouselItemModel>) {
        super();
        this.init(data);
    }

    public init(data?: Partial<ICarouselItemModel>): void {
        if (data) {
            this.id = data.id || null;
            this.data.img_url = data.img_url || null;
            this.data.article_id = data.article_id || null;
            this.data.active = data.active || false;
        }
    }
}