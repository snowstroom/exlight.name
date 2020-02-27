import { Connection, Repository } from 'typeorm';
import { Role } from 'server/src/models/role.model';
import { Access } from 'server/src/models/access.model';
import { User } from 'server/src/models/user.model';
import {
  ALLOW_ALL_ACCESS,
  ADMIN_USER,
  ADMIN_ROLE,
  ADMIN_ROLE_NAME,
  USER_ROLE,
  CONFIRMED_USER_ROLE,
} from 'server/src/consts/default-entity';

export async function initAccessDefRec(connection: Connection): Promise<void> {
  const roleRep: Repository<Role> = connection.getRepository(Role);
  const accessRep: Repository<Access> = connection.getRepository(Access);
  const usersRep: Repository<User> = connection.getRepository(User);
  try {
    const ADMIN_ROLE_INSTANSE = await roleRep.findOne({
      where: { name: ADMIN_ROLE_NAME },
    });
    if (!ADMIN_ROLE_INSTANSE) {
      const accessList = ALLOW_ALL_ACCESS.map(a => accessRep.create(a));
      await accessRep.insert(accessList);
      const accesses = await accessRep.find();
      const adminRole = roleRep.create({ ...ADMIN_ROLE, access: accesses });
      const { id } = await roleRep.save(adminRole);
      await roleRep.insert(USER_ROLE);
      await roleRep.insert(CONFIRMED_USER_ROLE);
      await usersRep.insert({
        ...ADMIN_USER,
        roleId: id,
      });
    }
  } catch (err) {
    throw new Error(`Init application was failed =( \n ${err}`);
  }
}
