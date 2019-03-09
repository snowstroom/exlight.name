import { structCreator } from './struct-generator';

const foolders: string[] = [
    'classes',
    'components',
    'consts',
    'enums',
    'interfaces',
    'pages',
    'services',
    'guards',
    'models'
];

structCreator(foolders);
