import { ApiProperty } from '@nestjs/swagger';
import { Player } from '../entities/player.entity';

export class LoginDto {
  @ApiProperty({
    type: 'string',
    example: 'chris21',
  })
  userName: string;

  @ApiProperty({
    type: 'string',
    example: 'chris_password_secure',
  })
  password: string;
}

export class LoginResponse {
  @ApiProperty({
    type: Player,
  })
  user: Partial<Player>;

  @ApiProperty({
    type: 'string',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiNDEzZjg1MDktYmU4MC00ZmYyLWE3YWUtNGI4Mzk1ZmVmMjZmIiwiaWF0IjoxNjc1NDk2ODc0LCJleHAiOjE2NzU1ODMyNzR9.CLHJasOICIxG_YXRMgd30-KpdZW6GrvxAABwNW1KGsE',
  })
  accesstoken: string;
}
