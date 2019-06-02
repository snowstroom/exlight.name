import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IncomingMessage } from 'http';
import { RolesAccesService } from 'src/services/roles-access.service';


@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private readonly jwt: JwtService,
        private readonly accessSrv: RolesAccesService,
    ) { }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: any = context.switchToHttp().getRequest();
        const token = req.headers.authorization as string;
        const { url, method, authInfo } = req;
        if (token) {
            try {
                await this.jwt.verifyAsync(token);
                const res = this.accessSrv.checkAccess(method, url, authInfo.roleId);
                return res;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else {
            return false;
        }
    }
}
