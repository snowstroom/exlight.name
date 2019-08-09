import { faUser, faCogs, faPencilAlt, faUserCog, faKey, faSitemap } from '@fortawesome/fontawesome-free-solid';
import { IAccountIco } from '@account-module/interfaces/account-ico';

export const ICONS: IAccountIco[] = [{
    ico: faUser,
    route: '/account/profile',
    title: 'Профиль'
}, {
    ico: faPencilAlt,
    route: '/account/articles',
    title: 'Статьи'
}, {
    ico: faUserCog,
    route: '/account/user-manage',
    title: 'Управление пользователями'
}, {
    ico: faKey,
    route: '/account/access-manage',
    title: 'Управление доступами'
}, {
    ico: faSitemap,
    route: '/account/categories-manage',
    title: 'Управление категориями'
}];
