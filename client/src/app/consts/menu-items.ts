import { IMenuItem } from '@app/interfaces/menu-item';

export const MENU_ITEMS: IMenuItem[] = [
  {
    name: 'Главная',
    route: [''],
    exact: true,
  },
  {
    name: 'Каталог',
    route: ['catalog'],
  },
  /* {
    name: 'Видео',
    route: ['video']
}, {
    name: 'Музыка',
    route: ['music']
}, {
    name: 'Фото',
    route: ['photo']
},*/ {
    name: 'Ссылки',
    route: ['about'],
    rel: 'contact',
  },
];
