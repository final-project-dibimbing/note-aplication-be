import { Body, Controller, Post, UseInterceptors , Query, Get,Headers, UseGuards} from "@nestjs/common";
import { ApiBearerAuth, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpReq } from './request/sign-up.request';
import { RespSuccessInteceptor } from "../middleware/interceptor/resp-success.inteceptor";
import { SignInRequest } from "./request/sign-in.request";
import { LoginInteceptor } from "../middleware/interceptor/login.inteceptor";
import { MustGuard } from "src/middleware/guard/must.guard";

@UseInterceptors(RespSuccessInteceptor)
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() data: SignUpReq) {
    return await this.service.signUp(data);
  }

  @UseInterceptors(LoginInteceptor)
  @Post('sign-in')
  async signIn(@Body() data : SignInRequest, @Query() query:any){
    return await this.service.signIn(query.payload);
  }

  @UseGuards(MustGuard)
  @ApiBearerAuth("token")
  @Get('me')
  async me(@Headers() header:any){
    console.log("header > ", header.user.id)
    return await this.service.me(header.user.id)
  }
}
