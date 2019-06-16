export interface ICategoriesItem {
    id: number;
    name: string;
    route: string;
    description: string;
}

export class CategoriesItem implements ICategoriesItem {
    public readonly isReady: Promise<void>;
    public readonly id: number = this.__data.id;
    public readonly itemWidth: number;
    public name: string = this.__data.name;
    public route: string = this.__data.route;
    public description: string = this.__data.description;

    public readonly fullRoute: string;
    public isActive: boolean;

    constructor(private __data: ICategoriesItem, template: string) {
        console.warn('Create first cat');
        this.fullRoute = template.replace('%', this.__data.route);
        const element = document.createElement('div');
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        const body = document.getElementsByTagName('body').item(0);
        element.style.padding = '8px 10px';
        element.style.fontSize = '1rem';
        element.style.fontFamily = 'Amatic SC, cursive';
        element.innerText = this.name;
        wrapper.appendChild(element);
        body.appendChild(wrapper);
        this.itemWidth = element.clientWidth;
        body.removeChild(wrapper);
    }
}
