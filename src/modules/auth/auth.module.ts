import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Player } from '../player/entities/player.entity';
import { PlayerService } from '../player/player.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Player]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRATION_TIME,
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtService, PlayerService],
  controllers: [],
  exports: [AuthService],
})
export class AuthModule {}
