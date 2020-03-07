import { AccessNamespace } from '@share/access.namespace';
import { AccessApi } from './access.api';

export class RoleApi implements AccessNamespace.IRole {
  public id: number;
  public access: AccessApi[];
  public description: string;
  public name: string;

  constructor(role?: AccessNamespace.IRole) {
    if (role) {
      this.id = role.id;
      this.description = role.description;
      this.name = role.name;
      this.access = role.access.map(a => new AccessApi(a));
    }
  }
}
