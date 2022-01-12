import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpReq } from './request/sign-up.request';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() data: SignUpReq) {
    return await this.service.signUp(data);
  }

  @Post('sign-in')
  async signIn(@Body() data : any){
    return await this.service.signIn(data);
  }
}
