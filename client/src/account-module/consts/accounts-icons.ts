import { faUser, faCogs, faPencilAlt, faUserCog, faKey, faSitemap } from '@fortawesome/fontawesome-free-solid';
import { IAccountIco } from '@account-module/interfaces/account-ico';

export const ICONS: IAccountIco[] = [{
    ico: faUser,
    route: 'profile',
    title: 'Профиль'
}, {
    ico: faCogs,
    route: 'profile',
    title: 'Настройки'
}, {
    ico: faPencilAlt,
    route: 'profile',
    title: 'Статьи'
}, {
    ico: faUserCog,
    route: 'profile',
    title: 'Управление пользователями'
}, {
    ico: faKey,
    route: 'profile',
    title: 'Управление доступами'
}, {
    ico: faSitemap,
    route: 'profile',
    title: 'Управление категориями'
}];
