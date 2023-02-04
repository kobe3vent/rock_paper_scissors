import { MoveOptions } from '../../src/modules/game/entities/game.entity';
import { Player } from '../../src/modules/player/entities/player.entity';

export const basePlayerEntity: Partial<Player> = {
  username: 'cecil',
  password: '$2y$10$slBupbVREytQ1OKU6q3jHe37GFM7qsW2zaJAFPqcJP3PlmOma.13S',
};

export const registeredPlayerEntity: Partial<Player> = {
  ...basePlayerEntity,
  uuid: '0011f7a8-e0f1-47a2-97c3-f79c17521730',
};

export const baseGameEntity = {
  number: 1,
  playerChoice: MoveOptions.PAPER,
  cpuChoice: MoveOptions.ROCK,
  playerWon: true,
  player: registeredPlayerEntity.uuid,
  comment: 'Player wins',
};
