import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
  Get,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExError } from 'server/src/classes/err';
import { AuthService } from 'server/src/services/auth.service';
import { MailerService } from 'server/src/services/mailer.service';
import { RolesAccesService } from 'server/src/services/roles-access.service';
import { Access } from 'server/src/models/access.model';
import { UserNamespace } from 'share';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'server/src/models/user.model';
import { CryptoService } from 'server/src/services/crypto.service';

@Controller('/api/auth')
export class AuthController {
  constructor(
    @InjectRepository(User) private userRep: Repository<User>,
    @InjectRepository(Access) private accessRep: Repository<Access>,
    private authSrv: AuthService,
    private mailSrv: MailerService,
    private roleSrv: RolesAccesService,
    private cryptoSrv: CryptoService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async userAuth(@Body() user: UserNamespace.IUser) {
    try {
      user.password = this.cryptoSrv.md5hash(user.password);
      const res = await this.userRep.findOne({ where: user });
      if (res) {
        const token = await this.authSrv.signIn({
          id: res.id,
          email: res.email,
          roleId: res.roleId,
        });
        return { token };
      } else {
        throw new ExError('User not found or password not true');
      }
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/refresh')
  public updateToken() {
    return;
  }

  @Post('/registration')
  public async userRigistr(@Body() user: Partial<UserNamespace.IUser>) {
    try {
      const existUser = await this.userRep.findOne({
        where: { email: user.email },
      });
      if (!existUser) {
        const userData: Partial<UserNamespace.IUser> = {
          email: user.email,
          password: this.cryptoSrv.md5hash(user.password).toString(),
          roleId: this.roleSrv.defRole.id,
        };
        await this.userRep.insert(userData);
        await this.mailSrv.confirmReg(user.email);
        return;
      } else {
        throw new Error('User exist');
      }
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/confirm/email')
  public async confirmEmail(@Query() params: any): Promise<any> {
    try {
      const user = await this.findNotConfirmedUser(params.hash);
      if (user) {
        await this.userRep.update(user.id, {
          ...user,
          roleId: this.roleSrv.defConfirmRole.id,
        });
        return;
      } else {
        return new HttpException(
          { error: 'Email not found' },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/disable/email')
  public async disableEmail(@Query() params: any): Promise<any> {
    try {
      const user = await this.findNotConfirmedUser(params.hash);
      if (user.roleId === this.roleSrv.defRole.id) {
        await this.userRep.delete(user);
      } else {
        return new HttpException(
          { error: 'You have alrady confirmed email' },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/forgot/email')
  public async forgotPsw(@Param() params: any): Promise<void> {
    try {
      const { email } = params;
      const usr = this.userRep.findOne({ where: { email } });
      if (usr) {
        await this.mailSrv.sendForgotMail(email);
      }
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async findNotConfirmedUser(hash: string): Promise<User> {
    const users = await this.userRep.find({ where: { roleId: 2 } });
    let user: User;
    users.forEach(u => {
      const eHash = this.cryptoSrv.md5hash(u.email);
      if (eHash === hash) {
        user = u;
      }
    });
    return user;
  }
}
