import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { omit } from 'lodash';
import { PlayerService } from '../player/player.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _playerService: PlayerService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRECT,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
    });
  }

  async validate(payload: any) {
    const id = payload?.subject;
    const player = await this._playerService.findOne({ where: { uuid: id } });
    if (!player) throw new ForbiddenException('unauthorized');
    return omit(player, ['password', 'updatedAt']);
  }
}
