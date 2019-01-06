export interface IModel {
    id: number;
    init(data: any): void;
    getInsertQuery(): string;
}