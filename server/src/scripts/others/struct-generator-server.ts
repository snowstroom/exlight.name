import { structCreator } from './struct-generator';
import { writeFileSync } from 'fs';

const serverFoolder: string[] = [
    'api',
    'classes',
    'consts',
    'enums',
    'intefaces',
    'models'
];

structCreator(serverFoolder);
writeFileSync('index.ts', '');