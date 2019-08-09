import { ICategory } from '@account-module/interfaces/category';

export const PROFILE_SECTIONS: ICategory[] = [{
    name: 'Профиль',
    route: 'profile',
    template: '/account/profile'
}, {
    name: 'Настройки',
    route: 'settings',
    template: '/account/profile/%'
}];

export const ARTICLES_SECTIONS: ICategory[] = [{
    name: 'Создать',
    route: 'create',
    template: '/account/articles/%'
}, {
    name: 'Мои статьи',
    route: 'list',
    template: '/account/articles/%'
}];
