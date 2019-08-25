export namespace AccessNamespace {
    // Super, Create, Read, Update, Delete
    export const CREATE = 0b01000;
    export const READ = 0b00100;
    export const UPDATE = 0b00010;
    export const DELETE = 0b00001;

    export enum E_ENTITY_TYPES {
        access = 'access',
        article = 'article',
        category = 'category',
        commentary = 'commentary',
        rating = 'rating',
        role = 'role',
        tag = 'tag',
        user = 'user',
    }

    export interface IAccess {
        id?: number;
        entity: string;
        access: number;
    }

    export interface IRole {
        id?: number;
        name: string;
        description: string;
        access?: IAccess[];
    }

}