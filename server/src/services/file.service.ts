import { Injectable } from '@nestjs/common';
import { readFile, readdir } from 'fs';

@Injectable()
export class FileService {

    public readFile(path: string): Promise<Buffer> {
        return new Promise((resolve, reject) =>
            readFile(path, (err, data) => err ? reject(err) : resolve(data)),
        );
    }

    public readDir(path: string): Promise<string[]> {
        return new Promise((resolve, reject) =>
            readdir(path, (err, data) => err ? reject(err) : resolve(data)),
        );
    }

}
