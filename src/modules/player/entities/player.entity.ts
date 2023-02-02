import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../shared/entities/abstractEntity';
import { Game } from '../../game/entities/game.entity';
import { hash } from 'bcryptjs';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsOptional, IsString } from 'class-validator';

const { UPDATE } = CrudValidationGroups;
const SALT = 10;

@Entity()
export class Player extends AbstractEntity {
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'text', unique: true })
  @IsString()
  username: string;

  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'text' })
  @IsString()
  password: string;
  //TODO: hide password key on all queries

  @OneToMany(() => Game, (game: Game) => game.player)
  game: Game[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, SALT);
  }
}
