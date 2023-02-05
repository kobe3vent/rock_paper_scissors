import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import {
  typeOrmConfigForTest,
  initDB,
  clearDB,
} from '../../../test/utils.test';
import { registeredPlayerEntity } from '../../../test/__mocks__/palyerData.mock';
import { TypeOrmExceptionFilter } from '../../utils/typeormExceptionHandler';
import { AuthModule } from '../auth/auth.module';
import { Player } from '../player/entities/player.entity';
import { PlayerModule } from '../player/player.module';
import { PlayerService } from '../player/player.service';
import { Game, MoveOptions } from './entities/game.entity';
import { GameController } from './game.controller';
import { GameService, PLAYER_INPUT } from './game.service';

let app: INestApplication;
let controller: GameController;
let gameService: GameService;
let PLAYER_WON = false;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRoot(typeOrmConfigForTest()),
      TypeOrmModule.forFeature([Player, Game]),
      AuthModule,
      PlayerModule,
    ],
    controllers: [GameController],
    providers: [GameService, PlayerService, JwtService],
  }).compile();

  app = module.createNestApplication();
  app.useGlobalFilters(new TypeOrmExceptionFilter());
  controller = module.get<GameController>(GameController);
  gameService = module.get<GameService>(GameService);

  await initDB(app.get(Connection));
});
afterAll(async () => {
  await clearDB(app.get(Connection));
  await app.close();
});

describe('GameController', () => {
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should play new game', async () => {
    const res = await controller.create(
      { choice: 0 },
      { user: registeredPlayerEntity },
    );

    PLAYER_WON = res.playerWon;
    expect(res.playerChoice).toBe(MoveOptions.ROCK);
    expect(res.number).toBe(1);
    expect(typeof res.playerWon).toBe('boolean');
    expect(res.player?.uuid).toBe(registeredPlayerEntity.uuid);
  });

  it('should get all games player has played', async () => {
    const res = await controller.findGameByPlayerID({
      user: { uuid: registeredPlayerEntity.uuid },
    });

    expect(res.length).toBe(1);
    expect(res).not.toBe([]);
  });

  it('should show leaderboard', async () => {
    const res = await controller.leaderboard();
    expect(res.length).toBe(PLAYER_WON ? 1 : 0);
  });

  it('should show cpu is not cheating', () => {
    const res = controller.cpuChoice();
    expect(res.options).toBe(PLAYER_INPUT);
    expect(PLAYER_INPUT).toContain(res.cpuChoice);
  });
});
