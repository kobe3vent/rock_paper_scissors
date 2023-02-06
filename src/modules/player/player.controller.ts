import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { AuthService } from '../auth/auth.service';
import { LoginDto, LoginResponse } from './dto/player.dto';
import { Player } from './entities/player.entity';
import { PlayerService } from './player.service';

@Crud({
  model: {
    type: Player,
  },
  routes: {
    exclude: [
      'replaceOneBase',
      'createManyBase',
      'deleteOneBase',
      'getManyBase',
    ],
  },
})
@Controller('player')
@ApiTags('player')
export class PlayerController {
  constructor(
    private readonly service: PlayerService,
    private readonly _authService: AuthService,
  ) {}

  @Post('login')
  @ApiResponse({ type: LoginResponse })
  login(@Body() user: LoginDto) {
    if (!user.userName || !user.password)
      throw new ForbiddenException('invalid input. check userName or password');

    return this._authService.login(user);
  }
}
