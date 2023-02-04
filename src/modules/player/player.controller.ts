import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { AuthService } from '../auth/auth.service';
import { Player } from './entities/player.entity';
import { PlayerService } from './player.service';

@Crud({
  model: {
    type: Player,
  },
})
@Controller('player')
export class PlayerController {
  constructor(
    private readonly service: PlayerService,
    private readonly _authService: AuthService,
  ) {}

  @Post('login')
  login(@Body() user: { userName: string; password: string }) {
    if (!user.userName || !user.password)
      throw new ForbiddenException('invalid input. check userName or password');

    return this._authService.login(user);
  }
}
