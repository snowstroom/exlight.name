import { IMenuItem } from '@app/interfaces/menu-item';

export const MENU_ITEMS: IMenuItem[] = [{
    name: 'Главная',
    route: ['']
}, {
    name: 'Каталог',
    route: ['catalog', 'all', 'page', '1']
}, {
    name: 'Видео',
    route: ['video']
}, {
    name: 'Музыка',
    route: ['music']
}, {
    name: 'Фото',
    route: ['photo']
}, {
    name: 'Ссылки',
    route: ['about']
}];
