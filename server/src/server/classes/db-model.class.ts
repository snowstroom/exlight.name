import { IDbModel, IDataModel } from '../interfaces/model.inteface';

export abstract class DbModel implements IDbModel {
    public id: number;
    public abstract data: IDataModel;
    protected abstract tableName: string;

    public abstract init(): void;

    public static createSelectQuery(fields: string[], table: string, start?: number, limit?: number): string {
        let fieldsStr = fields.join(', ');
        fieldsStr = fieldsStr.slice(0, fieldsStr.length - 2);
        let query = `SELECT ${fieldsStr} FROM ${table}`;
        if (limit) {
            query += ` LIMIT ${limit}`;
        }
        if (start) {
            query += ` OFFSET ${start}`;
        }
        return query;
    }

    public getFields(): string[] {
        return Object.keys(this.data);
    }

    public createSelectQuery(start?: number, limit?: number): string {
        const fields = this.getFields();
        return DbModel.createSelectQuery(fields, this.tableName, start, limit);
    }

    public createInsertQuery(): string {
        const keys = Object.keys(this.data);
        let keysStr = '';
        let valStr = '';
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            keysStr += `${key}, `;
            valStr += `${this.data[key] || 'NULL'}, `;
        }
        keysStr = keysStr.slice(0, keysStr.length - 2);
        valStr = valStr.slice(0, valStr.length - 2);
        return `INSERT INTO ${this.tableName} 
        (NULL, ${keysStr}) VALUES (${valStr}) 
        RETURNING id`;
    };

    public createUpdateQuery(): string {
        const keys = Object.keys(this.data);
        let fields: string = '';
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            fields += `${key} = ${this.data[key]}, `;
        }
        fields = fields.slice(0, fields.length - 2);
        const query: string = `UPDATE ${this.tableName} SET ${fields} WHERE id = ${this.id}`;
        return query;
    }

    public createDeleteQuery(): string {
        return `DELETE FROM ${this.tableName} WHERE id=${this.id}`;
    }
}