import { ArticleController } from './article.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('Article controller', async () => {
    let articleController: ArticleController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ArticleController],
        }).compile();

        articleController = app.get<ArticleController>(ArticleController);
    });
});
