import { PartialType } from '@nestjs/mapped-types';
import { CreateGameDto } from './game.dto';

export class UpdateGameDto extends PartialType(CreateGameDto) {}
