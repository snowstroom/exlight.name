import { Client } from 'pg';
import { dbConf } from '../../server/consts/db.const';
import { readFileSync, readdirSync } from 'fs'

const dbClient = new Client(dbConf);
const sqlDirName = `./db/tables`;

const initDb = async () => {
    try {
        await dbClient.connect();
        const tables = readdirSync(sqlDirName);
        for (let i = 0; i < tables.length; i++) {
            const table = tables[i];
            const query = readFileSync(`${sqlDirName}/${table}`).toString();
            await dbClient.query(query);
        }
        await dbClient.end();
    } catch (err) {
        console.log(`Migration failed! ${err}`);
        await dbClient.end();
    } 
}

initDb();