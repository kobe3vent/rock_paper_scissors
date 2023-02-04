import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, Generated, ManyToOne } from 'typeorm';
import { registeredPlayerEntity } from '../../../../test/__mocks__/palyerData.mock';
import { AbstractEntity } from '../../../shared/entities/abstractEntity';

import { Player } from '../../player/entities/player.entity';

export enum MoveOptions {
  ROCK = 'ROCK',
  PAPER = 'PAPER',
  SCISSORS = 'SCISSORS',
}
@Entity()
export class Game extends AbstractEntity {
  @Generated('increment')
  @Column({ type: 'int', nullable: false, unique: true })
  @ApiProperty({ description: 'Game number', example: 1 })
  number: number;

  @ApiProperty({
    description: 'player choice (ROCK, PAPER or SCISSOR)',
    example: MoveOptions.ROCK,
  })
  @Column({ type: 'enum', enum: MoveOptions })
  playerChoice: MoveOptions;

  @ApiProperty({
    description: 'CPU random choice (ROCK, PAPER or SCISSOR)',
    example: MoveOptions.SCISSORS,
  })
  @Column({ type: 'enum', enum: MoveOptions })
  cpuChoice: MoveOptions;

  @ApiProperty({
    description: 'Boolean to show if player won or not',
    example: true,
  })
  @Column({ type: 'boolean' })
  playerWon: boolean;

  @ApiProperty({
    description: 'Player who played the game',
    example: registeredPlayerEntity,
  })
  @ManyToOne(() => Player, (player: Player) => player.game)
  player: Player;

  @ApiProperty({
    description: 'Game commentary after the match',
    example: 'Player wins',
  })
  @IsNotEmpty()
  @Column({ type: 'text' })
  comment: string;

  @ApiProperty({
    description: 'Boolean if game ended in a draw',
    example: false,
  })
  @Expose()
  isDraw() {
    return this.playerChoice === this.cpuChoice;
  }
}
