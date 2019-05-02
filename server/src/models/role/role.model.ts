import * as sequelize from 'sequelize';
import { IRoleAtributes, IRoleInstance } from './role.interface';
import { UserModel } from '../user/user.model';

const atributes: sequelize.DefineModelAttributes<IRoleAtributes> = {
    name: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    }
}

export function RoleModel(dbase: sequelize.Sequelize) {
    const role = dbase.define<IRoleInstance, IRoleAtributes>('role', atributes);
    role.belongsTo(UserModel(dbase), { foreignKey: 'roleId' })
    return role;
}
