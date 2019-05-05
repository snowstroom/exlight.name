import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UserProvider } from '../../providers/user.provider';
import { PgProvider } from '../../providers/db-provider';
import { Repository } from 'typeorm';
import { IUser } from '../../models/user.model';
// import { User } from '';

describe('Auth Controller', () => {
    let auth: AuthController;
    // let userRep: Repository<User>

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
