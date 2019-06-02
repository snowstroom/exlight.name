import { IUser, USER_ENTITY } from 'src/models/user.model';
import { MD5 } from 'crypto-js';
import { IAccess, ACCESS_ENTITY } from 'src/models/access.model';
import { IRole, ROLES_ENTITY } from 'src/models/role.model';
import { RATING_ENTITY } from 'src/models/rating.model';
import { CATEGORY_ENTITY } from 'src/models/category.model';
import { TAG_ENTITY } from 'src/models/tag.model';
import { ARTICLE_ENTITY } from 'src/models/article.model';
import { ARTICLE_COMMENTS_ENTITY } from 'src/models/commentary.model';

export const ADMIN_USER: Partial<IUser> = {
    email: 'admin@xlight.name',
    password: MD5(process.env.APP_ADMIN_PASSWORD).toString(),
    firstname: 'Admin',
    secondname: 'Admin',
};

export const DEFAULT_ROLE_NAME = 'ADMIN';

export const ADMIN_ROLE: IRole = {
    name: DEFAULT_ROLE_NAME,
    description: 'Administrator of resourcse',
};
/**
 * Super, Create, Read, Update, Delete. Where not super - can mandge other users records
 */
const ALLOW_ALL = 0b11111;
/**
 * Allow all access for entities
 */
export const ALLOW_ALL_ACCESS: Array<Partial<IAccess>> = [{
    entity: ACCESS_ENTITY,
    access: ALLOW_ALL,
}, {
    entity: ARTICLE_ENTITY,
    access: ALLOW_ALL,
}, {
    entity: CATEGORY_ENTITY,
    access: ALLOW_ALL,
}, {
    entity: ARTICLE_COMMENTS_ENTITY,
    access: ALLOW_ALL,
}, {
    entity: RATING_ENTITY,
    access: ALLOW_ALL,
}, {
    entity: ROLES_ENTITY,
    access: ALLOW_ALL,
}, {
    entity: TAG_ENTITY,
    access: ALLOW_ALL,
}, {
    entity: USER_ENTITY,
    access: ALLOW_ALL,
}];
