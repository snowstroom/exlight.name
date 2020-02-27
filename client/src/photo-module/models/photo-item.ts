export interface IPhotoItem {
  id: number;
  description: string;
  url: string;
  shows: number;
}

export class PhotoItem implements IPhotoItem {
  public readonly id: number;
  public description: string;
  public url: string;
  public shows: number;
  constructor(private dataItem: IPhotoItem) {
    this.id = dataItem.id;
    this.shows = dataItem.shows;
    this.description = dataItem.description;
    this.url = dataItem.url;
  }
}
