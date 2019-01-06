export interface ICategoriesItem {
    id: number;
    name: string;
    route: string;
}

export class CategoriesItem implements ICategoriesItem {
    public readonly id: number;
    public name: string;
    public route: string;

    constructor(private itemData: ICategoriesItem) {
        this.id = itemData.id || null;
        this.name = itemData.name || null;
        this.route = itemData.route || null;
    }
}
