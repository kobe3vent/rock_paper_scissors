import { AfterLoad, BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../shared/entities/abstractEntity';
import { Game } from '../../game/entities/game.entity';
import { hash } from 'bcryptjs';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

const { UPDATE } = CrudValidationGroups;
const SALT = 10;

@Entity()
export class Player extends AbstractEntity {
  @ApiProperty({
    description: 'Player username',
    example: 'James201',
  })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'text', unique: true })
  @IsString()
  username: string;

  @ApiProperty({
    description:
      'Player password. This is only required during signup. it doesnt display on Player object return',
  })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'text' })
  @IsString()
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany(() => Game, (game: Game) => game.player)
  game: Game[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, SALT);
  }
}
