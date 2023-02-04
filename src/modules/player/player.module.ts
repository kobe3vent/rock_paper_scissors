import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Player } from './entities/player.entity';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  imports: [TypeOrmModule.forFeature([Player]), AuthModule],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
