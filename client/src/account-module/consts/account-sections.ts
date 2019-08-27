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
    route: 'list/page/1',
    template: '/account/articles/%'
}];

export const ACCESSES_SECTION: ICategory[] = [{
    name: 'Доступы',
    route: 'accesses',
    template: '/account/access-manage/%'
}, {
    name: 'Роли',
    route: 'roles',
    template: '/account/access-manage/%'
}];
