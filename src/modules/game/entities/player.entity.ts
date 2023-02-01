import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from './abstractEntity';
import { Game } from './game.entity';

@Entity()
export class Player extends AbstractEntity {
  @Column({ type: 'text', nullable: false })
  name: string;
  @ManyToMany(() => Game)
  game: Game[];
}
