import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RolesAccesService } from 'src/services/roles-access.service';
import { Reflector } from '@nestjs/core';
import { META_ACCESS_KEY, META_ENTITY_KEY, META_PUBLIC_KEY } from 'src/consts/meta-keys';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private readonly jwt: JwtService,
        private readonly accessSrv: RolesAccesService,
        private readonly reflector: Reflector,
    ) { }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const routeAccess = this.reflector.get(META_ACCESS_KEY, context.getHandler());
        const routeEntity = this.reflector.get(META_ENTITY_KEY, context.getHandler());
        const isPublic = this.reflector.get(META_PUBLIC_KEY, context.getHandler());
        console.warn(routeAccess, routeEntity, isPublic);
        const req: any = context.switchToHttp().getRequest();
        const token = req.headers.authorization as string;
        const { url, method, authInfo } = req;
        if (isPublic) {
            return true;
        } else if (token) {
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
