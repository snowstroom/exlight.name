import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UserProvider } from '../../providers/user.provider';
import { PgProvider } from '../../providers/db-provider';

describe('Auth Controller', () => {
    let auth: AuthController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                UserProvider,
                PgProvider,
            ],
        }).compile();
        auth = app.get<AuthController>(AuthController);
    });

    describe('Registration', () => {
        it('Empty registration', () => {
            auth.userRigistr({}).then((result) => {
                expect(result).toBe(undefined);
            });
        });
    });
});
