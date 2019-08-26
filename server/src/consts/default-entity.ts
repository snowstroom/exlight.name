import { MD5 } from 'crypto-js';
import { AccessNamespace, UserNamespace } from 'share';

export const ADMIN_USER: Partial<UserNamespace.IUser> = {
    email: process.env.APP_ADMIN_EMAIL,
    password: MD5(process.env.APP_ADMIN_PASSWORD).toString(),
    firstname: 'Admin',
    secondname: 'Admin',
};

export const ADMIN_ROLE_NAME = 'ADMIN';
export const USER_ROLE_NAME = 'USER';
export const CONFIRMED_USER_ROLE_NAME = 'CONFIRMED_USER';

export const ADMIN_ROLE: AccessNamespace.IRole = {
    name: ADMIN_ROLE_NAME,
    description: 'Administrator of resourcse',
};

export const USER_ROLE: AccessNamespace.IRole = {
    name: USER_ROLE_NAME,
    description: 'Common user of resource',
};

export const CONFIRMED_USER_ROLE: AccessNamespace.IRole = {
    name: CONFIRMED_USER_ROLE_NAME,
    description: 'User with confirmed email',
};
/**
 * Super, Create, Read, Update, Delete. Where super - can mandge other users records
 */
const ALLOW_ALL = 0b11111;
/**
 * Allow all access for entities
 */
export const ALLOW_ALL_ACCESS: Array<Partial<AccessNamespace.IAccess>> = [{
    entity: AccessNamespace.E_ENTITY_TYPES.access,
    access: ALLOW_ALL,
}, {
    entity: AccessNamespace.E_ENTITY_TYPES.article,
    access: ALLOW_ALL,
}, {
    entity: AccessNamespace.E_ENTITY_TYPES.category,
    access: ALLOW_ALL,
}, {
    entity: AccessNamespace.E_ENTITY_TYPES.commentary,
    access: ALLOW_ALL,
}, {
    entity: AccessNamespace.E_ENTITY_TYPES.rating,
    access: ALLOW_ALL,
}, {
    entity: AccessNamespace.E_ENTITY_TYPES.role,
    access: ALLOW_ALL,
}, {
    entity: AccessNamespace.E_ENTITY_TYPES.tag,
    access: ALLOW_ALL,
}, {
    entity: AccessNamespace.E_ENTITY_TYPES.user,
    access: ALLOW_ALL,
}];
