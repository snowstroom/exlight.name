import { CategoryController } from './category.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('Article controller', async () => {
    let categoryController: CategoryController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [CategoryController],
        }).compile();

        categoryController = app.get<CategoryController>(CategoryController);
    });
});
