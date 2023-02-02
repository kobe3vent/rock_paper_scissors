import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, Generated, ManyToOne } from 'typeorm';
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

  @Column({ type: 'enum', enum: MoveOptions })
  cpuChoice: MoveOptions;

  @Column({ type: 'boolean' })
  winner: boolean;

  @ManyToOne(() => Player, (player: Player) => player.game)
  player: Player;

  @IsNotEmpty()
  @Column({ type: 'text' })
  comment: string;

  @Expose()
  isDraw() {
    return this.playerChoice === this.cpuChoice;
  }
}
