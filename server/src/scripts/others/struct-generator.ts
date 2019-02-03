import { mkdirSync } from 'fs';

export function structCreator(foolders: string[]): void {
    const path = process.argv[2];
    if (!path) {
        console.log('Specify path to folder !');
        return;
    }

    for (let i = 0; i < foolders.length; i++) {
        const foolder = foolders[i];
        try {
            mkdirSync(`./${foolder}`);
            console.log(`Create foolder '${foolder}'`);
        } catch {
            console.log(`Can not create foolder '${foolder}'`);
        } 
    }
}
