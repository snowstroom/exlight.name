import { UserController } from './user.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('Article controller', async () => {
    let userController: UserController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
        }).compile();

        userController = app.get<UserController>(UserController);
    });
});
