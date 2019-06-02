import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from 'src/models/role.model';
import { ROLE } from 'src/consts/provider-names';
import { E_HTTP_METHODS, IRouteDescriptor, ROUTE_ENTITY_MAP } from 'src/consts/route-entity-map';

@Injectable()
export class RolesAccesService {
    private roles: Role[];
    private rolesByIdMap = new Map();
    private putRoutes: IRouteDescriptor[] = [];
    private deleteRoutes: IRouteDescriptor[] = [];
    private getRoutes: IRouteDescriptor[] = [];
    private postRoutes: IRouteDescriptor[] = [];

    constructor(@Inject(ROLE) private readonly rolesRep: Repository<Role>) {
        this.init();
        this.initRoutes();
    }

    private async init(): Promise<void> {
        const roles = await this.rolesRep.find({ relations: ['access'] });
        this.roles = roles;
        roles.forEach(r => this.rolesByIdMap.set(r.id, r));
    }

    private initRoutes() {
        ROUTE_ENTITY_MAP.forEach(r => {
            switch (r.method) {
                case E_HTTP_METHODS.GET: {
                    this.getRoutes.push(r);
                    break;
                }
                case E_HTTP_METHODS.POST: {
                    this.postRoutes.push(r);
                    break;
                }
                case E_HTTP_METHODS.PUT: {
                    this.putRoutes.push(r);
                    break;
                }
                case E_HTTP_METHODS.DELETE: {
                    this.deleteRoutes.push(r);
                    break;
                }
            }
        });
    }

    public checkAccess(method: E_HTTP_METHODS, path: string, roleId: number): boolean {
        switch (method) {
            case E_HTTP_METHODS.GET: {
                const curRoute = this.getRoutes.find(r => r.path.test(path));
                return this.isAllow(curRoute, roleId);
            }
            case E_HTTP_METHODS.POST: {
                const curRoute = this.postRoutes.find(r => r.path.test(path));
                return this.isAllow(curRoute, roleId);
            }

            case E_HTTP_METHODS.PUT: {
                const curRoute = this.putRoutes.find(r => r.path.test(path));
                return this.isAllow(curRoute, roleId);
            }
            case E_HTTP_METHODS.DELETE: {
                const curRoute = this.deleteRoutes.find(r => r.path.test(path));
                return this.isAllow(curRoute, roleId);
            }
        }
        return true;
    }

    private isAllow(curRoute: IRouteDescriptor, roleId: number): boolean {
        const entityRoles: Role[] = [];
        this.roles.forEach(r => {
            const role = r.access.find(a => a.entity === curRoute.entity);
            if (role) {
                entityRoles.push(r);
            }
        });
        const ent = entityRoles.find(r => r.id === roleId);
        return !!ent;
    }

}
