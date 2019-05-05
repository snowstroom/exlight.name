import { TagController } from './tag.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('Article controller', async () => {
    let tagController: TagController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [TagController],
        }).compile();

        tagController = app.get<TagController>(TagController);
    });
});
