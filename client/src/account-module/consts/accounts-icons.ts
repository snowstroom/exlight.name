import { IAccountIco } from '@account-module/interfaces/account-ico';

export const ICONS: IAccountIco[] = [{
    ico: 'la-user',
    route: '/account/profile',
    title: 'Профиль'
}, {
    ico: 'la-pencil',
    route: '/account/articles',
    title: 'Статьи'
}, {
    ico: 'la-cog',
    route: '/account/user-manage',
    title: 'Управление пользователями'
}, {
    ico: 'la-key',
    route: '/account/access-manage/accesses',
    title: 'Управление доступами'
}, {
    ico: 'la-sitemap',
    route: '/account/categories-manage',
    title: 'Управление категориями'
}];
