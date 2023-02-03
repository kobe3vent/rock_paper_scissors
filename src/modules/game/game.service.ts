import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { Game, MoveOptions } from './entities/game.entity';
import { Player } from '../player/entities/player.entity';

@Injectable()
export class GameService extends TypeOrmCrudService<Game> {
  constructor(@InjectRepository(Game) repo) {
    super(repo);
  }

  readonly RULES = {
    ROCK: MoveOptions.SCISSORS,
    SCISSORS: MoveOptions.PAPER,
    PAPER: MoveOptions.ROCK,
  };

  readonly gameComment = {
    won: 'Player wins',
    lost: 'CPU wins',
    draw: 'It is a draw',
  };

  readonly PLAYER_INPUT = [
    MoveOptions.ROCK,
    MoveOptions.PAPER,
    MoveOptions.SCISSORS,
  ];
  create(createGameDto: CreateGameDto, player: Player): Promise<Game> {
    const cpuChoice = this.pickMove();

    if (cpuChoice === this.PLAYER_INPUT[createGameDto.choice]) {
      return this.repo.save({
        playerChoice: this.PLAYER_INPUT[createGameDto.choice],
        cpuChoice,
        playerWon: false,
        player,
        comment: this.gameComment.draw,
      });
    }

    const res = this.compareMoves(
      this.PLAYER_INPUT[createGameDto.choice],
      cpuChoice,
    );

    return this.repo.save({
      playerChoice: this.PLAYER_INPUT[createGameDto.choice],
      cpuChoice,
      playerWon: res,
      player,
      comment: res ? this.gameComment.won : this.gameComment.lost,
    });
  }

  async getGamesByPlayerID(id: string): Promise<Game[]> {
    return this.repo.find({ where: { player: { uuid: id } } });
  }

  async leaderboard() {
    return this.repo.find({
      where: {
        playerWon: true,
      },
      order: {
        number: 'ASC',
      },
      relations: ['player'],
    });
  }

  private compareMoves(move1: MoveOptions, move2: MoveOptions): boolean {
    // move1 && move 2 should be checked prior. they cant be same
    return this.RULES[move1] === move2;
  }

  private pickMove() {
    //random pick one of the valid moves
    const possibleOptions = Object.values(this.RULES);
    const randomIndex = Math.round(Math.random() * 2);

    return possibleOptions[randomIndex];
  }
}
