import {
  Controller,
  Put,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Get,
  SetMetadata,
  UseGuards,
  Query,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../models/user.model';
import {
  META_ACCESS_KEY,
  META_ENTITY_KEY,
  META_PUBLIC_KEY,
} from 'server/src/consts/meta-keys';
import { AuthGuardService } from 'server/src/guards/auth.guard';
import { AccessNamespace, UserNamespace, ApiNamespace } from 'share';
import { InjectRepository } from '@nestjs/typeorm';
import { E_SERVER_MODE } from 'server/src/consts/enums';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from 'server/src/services/file.service';
import { IMulterFile } from 'server/src/interfaces';
import { CryptoService } from 'server/src/services/crypto.service';

const { MODE } = process.env;

@Controller({ path: 'api/user' })
@UseGuards(AuthGuardService)
export class UserController {
  constructor(
    @InjectRepository(User) private userRep: Repository<User>,
    private fileSrv: FileService,
    private cryptoSrv: CryptoService,
  ) {}

  @Get('/list')
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.READ)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.user)
  @SetMetadata(META_PUBLIC_KEY, MODE === E_SERVER_MODE.DEVELOP)
  public async userList(
    @Query() query: UserNamespace.IUserApiList,
  ): Promise<ApiNamespace.IPaginationContent<User>> {
    const { limit, start, roleId } = query;
    try {
      const [content, count] = await this.userRep.findAndCount({
        where: roleId ? { roleId } : {},
        skip: start,
        take: limit,
        select: ['firstname', 'secondname', 'email', 'role', 'roleId'],
      });
      return { content, count };
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:id')
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.READ)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.user)
  @SetMetadata(META_PUBLIC_KEY, MODE === E_SERVER_MODE.DEVELOP)
  public async getUserInfo(@Param() { id }: { id: number }) {
    try {
      const res = await this.userRep.findOne(id, {
        select: ['id', 'email', 'firstname', 'secondname', 'roleId'],
      });
      if (res) {
        return res;
      } else {
        throw new HttpException({ error: '' }, HttpStatus.NOT_FOUND);
      }
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/:id')
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.UPDATE)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.user)
  @SetMetadata(META_PUBLIC_KEY, MODE === E_SERVER_MODE.DEVELOP)
  public async updateUser(
    @Param() params: any,
    @Body() user: Partial<UserNamespace.IUser>,
  ): Promise<void> {
    try {
      await this.userRep.update(params.id, user);
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/photo/upload')
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.UPDATE)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.user)
  @UseInterceptors(FileInterceptor('file'))
  public async uploadPhoto(
    @UploadedFile()
    file: IMulterFile,
  ) {
    const fileName = this.cryptoSrv.md5hash(file.buffer.toString());
    this.fileSrv.writeFile(`./${file.originalname}`, file.buffer);
  }
}
