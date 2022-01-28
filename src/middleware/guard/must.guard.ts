import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
const jwt = require('jsonwebtoken')

@Injectable()
export class MustGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if(request.headers.authorization){
        const token = request.headers.authorization.split(" ")[1]
        const user = jwt.decode(token)
        if(user){
            request.headers['user']=user
            return true
        }else{
            throw new UnauthorizedException
        }   
     }
    return false;
  }
}
