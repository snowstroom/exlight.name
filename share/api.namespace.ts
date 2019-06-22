export namespace ApiNamespace {
    export interface IPaginationContent<T> {
        content: T[];
        count: number;
    }
}