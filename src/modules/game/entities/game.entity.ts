import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Generated, OneToOne } from 'typeorm';
import { AbstractEntity } from './abstractEntity';
import { Move, MoveOptions } from './move.entity';

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
  @OneToOne(() => Move)
  player_choice: Move;

  @OneToOne(() => Move)
  cpu_choice: Move;
}
