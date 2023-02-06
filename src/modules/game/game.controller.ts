import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { GameService, PLAYER_INPUT } from './game.service';
import { cpuChoiceResponse, CreateGameDto } from './dto/game.dto';
import { Game } from './entities/game.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private readonly service: GameService) {}

  @Post()
  @ApiResponse({
    type: Game,
  })
  create(@Body() createGameDto: CreateGameDto, @Req() req) {
    return this.service.create(createGameDto, req.user);
  }

  @Get('/mygames')
  @ApiResponse({
    type: [Game],
  })
  findGameByPlayerID(@Req() req) {
    return this.service.getGamesByPlayerID(req.user?.uuid);
  }

  @Get('/leaderboard')
  @ApiResponse({
    type: [Game],
  })
  leaderboard() {
    return this.service.leaderboard();
  }

  @Get('cpu')
  @ApiResponse({
    type: cpuChoiceResponse,
  })
  cpuChoice() {
    return {
      options: PLAYER_INPUT,
      cpuChoice: this.service.pickMove(),
    };
  }
}
