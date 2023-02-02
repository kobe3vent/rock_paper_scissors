import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Player } from './entities/player.entity';
import { PlayerService } from './player.service';

@Crud({
  model: {
    type: Player,
  },
})
@Controller('player')
export class PlayerController {
  constructor(private readonly service: PlayerService) {}
}
