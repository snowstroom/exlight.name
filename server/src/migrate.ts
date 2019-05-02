import * as Sequelize from 'sequelize';
import { DEV } from './config/config';
import { ArticleModel } from './models/article/article.model';
import { CategoryModel } from './models/category/category.model';
import { CommentaryModel } from './models/commentary/commentary.model';
import { TagModel, TagOfArticle } from './models/tag/tag.model';
import { RatingModel } from './models/rating/rating.model';
import { UserModel } from './models/user/user.model';

const db = new Sequelize(DEV);

const tagModel = TagModel(db);
const tagOfArticle = TagOfArticle(db);
const artModel = ArticleModel(db);
const catModel = CategoryModel(db);
const commentModel = CommentaryModel(db);
const rating = RatingModel(db);
const userModel = UserModel(db);

const migrate = async () => {
    await tagModel.sync();
    console.log('Tag model migrate');
    await artModel.sync();
    console.log('Article model migrate');
    await tagModel.sync();
    console.log('Tag model migrate');
    tagOfArticle.sync();
    console.log('TagOfArticle model migrate');
    await catModel.sync();
    console.log('Category model migrate');
    await commentModel.sync();
    console.log('Commentary model migrate');
    await rating.sync();
    console.log('Rating model migrate');
    await userModel.sync();
    console.log('User model migrate');

    db.close();
};

migrate();
