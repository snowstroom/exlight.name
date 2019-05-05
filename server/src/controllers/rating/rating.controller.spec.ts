import { RatingController } from './rating.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('Article controller', async () => {
    let ratingController: RatingController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [RatingController],
        }).compile();

        ratingController = app.get<RatingController>(RatingController);
    });
});
