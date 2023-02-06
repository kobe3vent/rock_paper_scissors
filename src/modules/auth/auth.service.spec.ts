import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import {
  clearDB,
  initDB,
  typeOrmConfigForTest,
} from '../../../test/utils.test';
import {
  basePlayerEntity,
  registeredPlayerEntity,
} from '../../../test/__mocks__/palyerData.mock';
import { TypeOrmExceptionFilter } from '../../utils/typeormExceptionHandler';
import { Player } from '../player/entities/player.entity';
import { PlayerModule } from '../player/player.module';
import { PlayerService } from '../player/player.service';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';

let app: INestApplication;
let service: AuthService;
const PASSWORD = 'cecil_password';

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRoot(typeOrmConfigForTest()),
      TypeOrmModule.forFeature([Player]),
      AuthModule,
      PlayerModule,
    ],
    providers: [AuthService, PlayerService, JwtService],
  }).compile();

  app = module.createNestApplication();
  app.useGlobalFilters(new TypeOrmExceptionFilter());
  service = module.get<AuthService>(AuthService);
  await initDB(app.get(Connection));
});
afterAll(async () => {
  await clearDB(app.get(Connection));
  await app.close();
});

describe('AuthService', () => {
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login', async () => {
    const res = await service.login({
      userName: basePlayerEntity.username,
      password: PASSWORD,
    });

    expect(res.player.username).toBe(basePlayerEntity.username);
    expect(res.player.uuid).toBeDefined();
  });

  it('should generate token', async () => {
    const validToken = await service.generateAccessToken(
      registeredPlayerEntity as Player,
    );

    expect(typeof validToken).toBe('string');
    expect(validToken).not.toEqual(undefined);
    expect(validToken).not.toEqual('');
    expect(validToken).not.toEqual(null);
    expect(validToken.length).toBeGreaterThan(10);
  });
});
