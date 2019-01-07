export interface IDbModel {
    id: number;
    data: IDataModel;
    init(data: IDataModel): void;
    getFields(): string[];
    createInsertQuery(): string;
    createUpdateQuery(): string;
    createDeleteQuery(): string;
}

export interface IDataModel {
    [field: string]: any;
}