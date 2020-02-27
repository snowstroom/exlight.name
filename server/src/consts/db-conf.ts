import { Category } from '../models/category.model';
import { Rating } from '../models/rating.model';
import { Commentary } from '../models/commentary.model';
import { Role } from '../models/role.model';
import { Tag } from '../models/tag.model';
import { User } from '../models/user.model';
import { Atricle } from '../models/article.model';
import { Access } from 'server/src/models/access.model';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ENTITIES = [
  Atricle,
  Category,
  Commentary,
  Rating,
  Role,
  Tag,
  User,
  Access,
];

export const DB_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTRGES_DB,
  entities: ENTITIES,
  synchronize: true,
};
