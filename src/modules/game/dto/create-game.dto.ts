import { IsEnum } from 'class-validator';

export enum ValidInput {
  ROCK = 0,
  PAPER = 1,
  SCISSORS = 2,
}
export class CreateGameDto {
  @IsEnum(ValidInput)
  choice: number;
}
