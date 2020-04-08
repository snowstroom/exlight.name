import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Access } from 'server/src/models/access.model';

import { Article } from '../models/article.model';
import { Category } from '../models/category.model';
import { CommentaryLike } from '../models/commentary-like.model';
import { Commentary } from '../models/commentary.model';
import { Rating } from '../models/rating.model';
import { Role } from '../models/role.model';
import { Tag } from '../models/tag.model';
import { User } from '../models/user.model';

export const ENTITIES = [
  Article,
  Category,
  Commentary,
  Rating,
  Role,
  Tag,
  User,
  Access,
  CommentaryLike,
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
