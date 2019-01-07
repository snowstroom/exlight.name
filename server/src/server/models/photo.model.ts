import { IDataModel } from '../interfaces/model.inteface';
import { PHOTOS } from '../consts/tables.const';
import { DbModel } from '../classes/db-model.class';

export interface IPhotoModel {
    id?: number;
    img_url: string;
    photo_description: string;
    views: number;
}

export class PhotoModel extends DbModel {
    public id: number = null;
    public tableName: string = PHOTOS;
    public data: IDataModel = {
        img_url: null,
        photo_description: null,
        views: null
    }
    
    constructor(data?: Partial<IPhotoModel>) {
        super();
        this.init(data);
    }

    public init(data?: Partial<IPhotoModel>): void {
        if (data) {
            this.id = data.id;
            this.data.img_url = data.img_url || null;
            this.data.photo_description = data.photo_description || null;
            this.data.views = data.views;
        }
    }

}