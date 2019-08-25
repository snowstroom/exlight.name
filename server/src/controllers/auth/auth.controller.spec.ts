import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('Auth Controller', () => {
    let auth: AuthController;
    // let userRep: Repository<User>

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [],
        }).compile();
        auth = app.get<AuthController>(AuthController);
    });
    describe('Registration', () => {
        it('Empty registration', () => {
            auth.userRigistr({}).then((result) => {
                expect(result).toBeUndefined();
            });
        });
        it('Reg', () => {
            auth.userRigistr({
                email: 'kerpith@gmail.com',
                password: '123456789',
            }).then((res) => {
                expect(res).toBeUndefined();
            });
        });
    });
});
