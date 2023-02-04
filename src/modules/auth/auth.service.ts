import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { omit } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { PlayerService } from '../player/player.service';
import { Player } from '../player/entities/player.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly _playerService: PlayerService,
    private readonly _jwtService: JwtService,
  ) {}

  async generateAccessToken({ uuid }: Player) {
    const payload = { subject: String(uuid) };
    return this._jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRECT,
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });
  }

  async login({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }): Promise<{ user: Partial<Player>; accessToken: string }> {
    const player = await this.validatePlayer(userName, password);

    const accessToken = await this.generateAccessToken(player);

    return {
      user: omit(player, ['password', 'updatedAt']),
      accessToken,
    };
  }

  async validatePlayer(userName: string, pass: string): Promise<Player> {
    const player = await this._playerService.getPlayerByUsername(
      userName,
      true,
    );

    if (!player) {
      throw new ForbiddenException('user name not found');
    }

    const { password } = player;
    const match = await bcrypt.compare(pass, password);
    if (!match) {
      throw new ForbiddenException('invalid password');
    }

    return player;
  }
}
