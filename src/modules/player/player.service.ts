import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Player } from './entities/player.entity';

export class PlayerService extends TypeOrmCrudService<Player> {
  constructor(@InjectRepository(Player) repo) {
    super(repo);
  }

  getPlayerByUsername(username: string): Promise<Player> {
    return this.repo.findOne({
      where: { username },
    });
  }
}
