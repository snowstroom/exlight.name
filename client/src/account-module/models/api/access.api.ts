import { AccessNamespace } from '@share/access.namespace';

export class AccessApi implements AccessNamespace.IAccess {
  public id: number;
  public entity: string;
  public access: number;
  public description: string;

  constructor(access?: AccessNamespace.IAccess) {
    if (access) {
      this.id = access.id;
      this.entity = access.entity;
      this.access = access.access;
      this.description = access.description;
    }
  }
}
