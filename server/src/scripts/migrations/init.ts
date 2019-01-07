import { Client } from 'pg';
import { dbConf } from '../../server/consts/db.const';
import { readFileSync } from 'fs'

const dbClient = new Client(dbConf);
const sqlDirName = `./db/tables`;
const sqlScriptDir = './db/links';
const sqlScripts: string[] = [
    'article-carousel-item.sql',
    'article-category.sql',
    'carousel-item-article.sql'
];
const initOrder: string[] = [
    'categories.table.sql',
    'carousel_items.table.sql',
    'articles.table.sql',
    'photos.table.sql',
    'tracks.table.sql',
    'video.table.sql'
];

(async () => {
    try {
        await dbClient.connect();
        for (let i = 0; i < initOrder.length; i++) {
            const file = initOrder[i];
            const sql = readFileSync(`${sqlDirName}/${file}`).toString();
            await dbClient.query(sql);
            console.log(`Success migration from file ${file}`);
        }
        for (let i = 0; i < sqlScripts.length; i++) {
            const script = sqlScripts[i];
            const linkSql = readFileSync(`${sqlScriptDir}/${script}`).toString();
            const res = await dbClient.query(linkSql);
            console.log(`Success link! File script ${script}`);
        }
        await dbClient.end();
    } catch (err) {
        console.log(`Migration failed! ${err}`);
        await dbClient.end();
    } 
})();
