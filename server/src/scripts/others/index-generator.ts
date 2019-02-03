import { writeFileSync, readdirSync } from 'fs';
import { extname, basename } from 'path';

const isIndex = (file: string): boolean => {
    if (file === 'index.ts' || file === 'index.js') {
        return true;
    } else {
        return false;
    }
}

const curExt = (ext?: string): string => ext ? ext : 'js';

((): void => {
    const path = process.argv[2];
    const ext = process.argv[3];
    if (!path) {
        console.log('Specify path to folder !');
        return;
    }
    let files = [];
    try {
        files = readdirSync(`./${path}`);
    } catch {
        console.log(`Can not read dir with name '${path}'`);
        return;
    }
    if (!files.length) {
        console.log('Files not found!');
        return;
    }
    let index = '';
    for (let i = 0; i < files.length; i++) {
        const file: string = files[i];
        if (!isIndex(file) && extname(file) === '.ts' || extname(file) === '.js') {
            index += `export * from './${basename(file.slice(0, file.length - 3))}';\n`;
        }
    }
    index += '\n';
    try {
        writeFileSync(`./${path}/index.${curExt(ext)}`, index);
    } catch {
        console.log(`Can not create file 'index.${curExt(ext)}'`);
        return;
    }
    console.log(`File 'index.${curExt(ext)}' generated successfully!`);
})();


