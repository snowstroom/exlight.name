export interface ICategoriesItem {
    id: number;
    categoryName: string;
    categoryRoute: string;
}

export class CategoriesItem implements ICategoriesItem {
    public readonly id: number = this.__data.id;
    public readonly itemWidth: number;
    public categoryName: string = this.__data.categoryName;
    public categoryRoute: string = this.__data.categoryRoute;

    public isActive: boolean;

    constructor(private __data: ICategoriesItem) {
        const element = document.createElement('div');
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        const body = document.getElementsByTagName('body').item(0);
        element.style.padding = '8px 10px';
        element.style.fontSize = '1rem';
        element.style.fontFamily = 'Amatic SC, cursive';
        element.innerText = this.categoryName;
        wrapper.appendChild(element);
        body.appendChild(wrapper);
        this.itemWidth = element.clientWidth;
        body.removeChild(wrapper);
    }
}
