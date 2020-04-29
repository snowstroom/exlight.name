import { Injectable } from '@nestjs/common';
import { FileService } from './file.service';
import { CryptoService } from './crypto.service';
import { IMulterFile } from 'server/src/interfaces';

@Injectable()
export class FileStoreService {
  private storePath = `${process.env.HOME}${process.env.FILE_STORE_PATH}`;

  constructor(private fileSrv: FileService, private cryptoSrv: CryptoService) {}

  public async saveUserPhoto(fileInf: IMulterFile): Promise<void> {
    const name = this.cryptoSrv.md5hash(fileInf.buffer.toString());
    const [dir, dir2, file] = name.match(/(.{2,2})(.{2,2})(.{28,28})/);
    const dirPath = `${this.storePath}/${dir}`;
    const dir2Path = `${dirPath}/${dir2}`;
    const filePath = `${dir2Path}/${file}`;
    await this.fileSrv.mkdir(dirPath);
    await this.fileSrv.mkdir(dir2Path);
    await this.fileSrv.writeFile(filePath, fileInf.buffer);
  }

  public async saveArticleImage(fileInf: IMulterFile): Promise<void> {}
}
