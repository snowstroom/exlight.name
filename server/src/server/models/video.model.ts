import { IDataModel } from '../interfaces/model.inteface';
import { VIDEOS } from '../consts/tables.const';
import { DbModel } from '../classes/db-model.class';

export interface IVideoModel {
    id?: number;
    video_url: string;
}

export class VideoModel extends DbModel {
    public id: number = null;
    public tableName: string = VIDEOS;
    public data: IDataModel = {
        video_url: null
    }

    constructor(data?: IVideoModel) {
        super();
        this.init(data);
    }

    public init(data?: IVideoModel): void {
        if (data) {
            this.id = data.id || null;
            this.data.video_url = data.video_url || null;
        }
    }
}
