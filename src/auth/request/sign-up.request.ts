import { ApiProperty } from '@nestjs/swagger';

export class SignUpReq {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  phone_number: string;
}
