import { Connection, Repository } from 'typeorm';
import { Player } from '../src/modules/player/entities/player.entity';
import { registeredPlayerEntity } from './__mocks__/palyerData.mock';

export const typeOrmConfigForTest = (): object => ({
  type: 'postgres',
  host: process.env.TEST_DB_HOST,
  port: process.env.TEST_DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  autoLoadEntities: true,
  entities: [__dirname + '/../src/modules/**/*.entity{.ts,.js}'],
});

export const initDB = async (connection: Connection): Promise<any> => {
  return connection.getRepository(Player.name).save(registeredPlayerEntity);
};

export const clearDB = async (connection: Connection): Promise<any> => {
  const entities = connection.entityMetadatas;
  for (const entity of entities) {
    if (entity.name !== 'User') {
      const repository: Repository<typeof entity> = connection.getRepository<
        typeof entity
      >(entity.name);
      await repository.query(
        `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`,
      );
    }
  }
};

export const loadGameEntity = async (
  connection: Connection,
  player: Partial<Player>,
): Promise<any> => {
  await connection.getRepository(Player.name).save(player);
};
