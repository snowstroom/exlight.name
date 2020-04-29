import { Injectable } from '@nestjs/common';
import {
  readFile,
  readdir,
  writeFile,
  mkdir,
  exists,
  rmdir,
  PathLike,
} from 'fs';

@Injectable()
export class FileService {
  public readFile(path: string): Promise<Buffer> {
    return new Promise((resolve, reject) =>
      readFile(path, (err, data) => (err ? reject(err) : resolve(data))),
    );
  }

  public writeFile(path: string, data: ArrayBuffer | string): Promise<void> {
    return new Promise((resolve, reject) =>
      writeFile(path, data, err => (err ? reject() : resolve())),
    );
  }

  public readDir(path: string): Promise<string[]> {
    return new Promise((resolve, reject) =>
      readdir(path, (err, data) => (err ? reject(err) : resolve(data))),
    );
  }

  public rmdir(path: PathLike): Promise<void> {
    return new Promise((resolve, reject) =>
      rmdir(path, err => (err ? reject(err) : resolve())),
    );
  }

  public mkdir(path: PathLike): Promise<void> {
    return new Promise((resolve, reject) =>
      mkdir(path, err => (err ? reject() : resolve)),
    );
  }

  public exists(path: PathLike): Promise<boolean> {
    return new Promise(resolve => exists(path, ex => resolve(ex)));
  }
}
