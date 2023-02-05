import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { PLAYER_INPUT } from '../game.service';

export enum ValidInput {
  ROCK = 0,
  PAPER = 1,
  SCISSORS = 2,
}
export class CreateGameDto {
  @ApiProperty({
    enum: [ValidInput.ROCK, ValidInput.PAPER, ValidInput.SCISSORS],
    example: ValidInput.ROCK,
  })
  @IsEnum(ValidInput)
  choice: number;
}

export class cpuChoiceResponse {
  @ApiProperty({
    enum: [PLAYER_INPUT],
  })
  options: string;

  @ApiProperty({
    enum: PLAYER_INPUT,
  })
  cpuChoice: string;
}
