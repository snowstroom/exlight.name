import { readFileSync, writeFileSync } from 'fs';

const file = readFileSync(`${__dirname}/file`).toString();
const strArr = file.split('\n');

let outFile: string = 'export class Test {\n';
let isCase: boolean = false;
for (let i = 0; i < strArr.length; i++) {
    const str = strArr[i];
    let strElem = str.split('—');
    if (strElem[1]) {
        if (isCase) {
            outFile += '}\n }\n';
        }
        isCase = false;
        const methodNameArr = strElem[1].split(' ');
        const methodName = methodNameArr.join('');
        outFile += `public static ${methodName}(err: QueryResultError): DbHttpError {\n`;
        outFile += 'switch (err.code) {\n';
    } else {
        isCase = true;
        strElem = str.split('\t');
        const dscrpArr = strElem[1].split('_');
        dscrpArr[0] = dscrpArr[0][0].toUpperCase() + dscrpArr[0].slice(1);
        const descrp = dscrpArr.join(' ');
        outFile += `case '${strElem[0]}': return { code: ${0}, description: '${descrp}'}; // ${strElem[1]} \n`;
    }
}
outFile += '}';

writeFileSync(`${__dirname}/out.ts`, outFile);