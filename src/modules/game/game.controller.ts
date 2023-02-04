import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './entities/game.entity';
import { Crud } from '@nestjsx/crud';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Crud({
  model: {
    type: Game,
  },
})
@UseGuards(JwtAuthGuard)
@Controller('game')
export class GameController {
  constructor(private readonly service: GameService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto, @Req() req) {
    return this.service.create(createGameDto, req.user);
  }

  @Get('/mygames')
  findGameByPlayerID(@Req() req) {
    return this.service.getGamesByPlayerID(req.user?.uuid);
  }

  @Get('/leaderboard')
  leaderboard() {
    return this.service.leaderboard();
  }

  @Get('cpu')
  cpuChoice() {
    return {
      options: this.service.PLAYER_INPUT,
      cpuChoice: this.service.pickMove(),
    };
  }
}
