import {
  CallHandler,
  ExecutionContext, Inject,
  Injectable,
  Logger,
  NestInterceptor,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
const bcrypt = require("bcryptjs");

import { Observable } from "rxjs";
import { Repository } from "typeorm";
import { UserEntity } from "../../entity/users.entity";

@Injectable()
export class LoginInteceptor implements NestInterceptor {
  constructor( @Inject("USER_REPOSITORY")
               private userRepository: Repository<UserEntity>) {}

  private async validate(value: any) {
    try {
      const find = await this.userRepository.findOne({
        where: {
          email: value
        }
      });
      return Object.assign({ data: find });
    } catch (e) {
      return false;
    }
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    request.user =
      request.body.email && request.body.email !== ""
        ? (await this.validate(request.body.email)).data
        : next;
    if ((!request.user) || !(await this.compare(request.body.password ,request.user.password))){
      throw new UnauthorizedException("Invalid email or password");
    }

    request.query["payload"] = request.user;
    return next.handle();
  }

  async compare(s: string, hash: string) {
    return await bcrypt.compareSync(s.toString(), hash);
  }
}
