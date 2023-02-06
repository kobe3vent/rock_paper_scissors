import { MoveOptions } from '../../src/modules/game/entities/game.entity';
import { registeredPlayerEntity } from './palyerData.mock';

export const baseGameEntity = {
  number: 1,
  playerChoice: MoveOptions.PAPER,
  cpuChoice: MoveOptions.ROCK,
  playerWon: true,
  player: registeredPlayerEntity.uuid,
  comment: 'Player wins',
};
