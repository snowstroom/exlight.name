export namespace ApiNamespace {
  export interface IPaginationContent<T> {
    content: T[];
    count: number;
  }

  export interface IApiList {
    start: number;
    limit: number;
  }
}
