import { Column, Entity, ManyToMany, OneToOne } from 'typeorm';
import { AbstractEntity } from './abstractEntity';
import { Game } from './game.entity';
import { Player } from './player.entity';

export enum MoveOptions {
  ROCK = 'ROCK',
  PAPER = 'PAPER',
  SCISSORS = 'SCISSORS',
}

@Entity()
export class Move extends AbstractEntity {
  @Column({ type: 'enum', nullable: false, enum: MoveOptions })
  choice: MoveOptions;

  @OneToOne(() => Player)
  player: Player;

  @OneToOne(() => Game)
  game: Game;
}
