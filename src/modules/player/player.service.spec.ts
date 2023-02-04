import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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

let app: INestApplication;
let service: PlayerService;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRoot(typeOrmConfigForTest()),
      TypeOrmModule.forFeature([Player]),
      PlayerModule,
    ],
    providers: [PlayerService],
  }).compile();

  app = module.createNestApplication();
  app.useGlobalFilters(new TypeOrmExceptionFilter());
  service = module.get<PlayerService>(PlayerService);
  await initDB(app.get(Connection));
});
afterAll(async () => {
  await clearDB(app.get(Connection));
  await app.close();
});

describe('Player Service', () => {
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get player by username and return password', async () => {
    const player = await service.getPlayerByUsername(
      basePlayerEntity.username,
      true,
    );

    expect(player.uuid).toBeDefined();
    expect(player.password).toBeDefined();
    expect(player.uuid).toEqual(registeredPlayerEntity.uuid);
    expect(player.password).toEqual(registeredPlayerEntity.password);
  });

  it('should get player by user name and return without password', async () => {
    const player = await service.getPlayerByUsername(
      registeredPlayerEntity.username,
      false,
    );

    expect(player.uuid).toBeDefined();
    expect(player.password).not.toBeDefined();
    expect(player.uuid).toEqual(registeredPlayerEntity.uuid);
  });
});
