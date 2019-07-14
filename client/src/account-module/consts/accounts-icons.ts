import { faUser, faCogs, faPencilAlt, faUserCog, faKey, faSitemap } from '@fortawesome/fontawesome-free-solid';
import { IAccountIco } from '@account-module/interfaces/account-ico';

export const ICONS: IAccountIco[] = [{
    ico: faUser,
    route: '/',
    title: 'Профиль'
}, {
    ico: faCogs,
    route: 'settings',
    title: 'Настройки'
}, {
    ico: faPencilAlt,
    route: 'articles',
    title: 'Статьи'
}, {
    ico: faUserCog,
    route: 'user-manage',
    title: 'Управление пользователями'
}, {
    ico: faKey,
    route: 'access-manage',
    title: 'Управление доступами'
}, {
    ico: faSitemap,
    route: 'categories-manage',
    title: 'Управление категориями'
}];
