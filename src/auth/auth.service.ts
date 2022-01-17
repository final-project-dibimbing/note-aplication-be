import { Injectable, Inject } from '@nestjs/common';
import { UserEntity } from 'src/entity/users.entity';
import { Repository } from 'typeorm';
import { SignUpReq } from './request/sign-up.request';
import { SignInRequest } from './request/sign-in.request';
import { InjectRepository } from '@nestjs/typeorm';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async signUp(data: SignUpReq) {
    data['status'] = true;
    data['picture'] = '';
    data['password'] = await this.hash(data.password);

    const saveUser = await this.userRepository.save(data);
    console.log('saveUser >', saveUser);
    return 'Sign up success';
  }

  public async signIn(user: any) {
    return {
      fullname: user.fullname,
      email: user.email,
      token: await jwt.sign(
        {
          id: user.id,
          username: user.fullname,
          address: user.email,
          phone_number: user.phone_number,
        },
        'SECRET', //process.env.SECRET
      ),
    };
  }

  private async hash(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    return hash;
  }

  public async me(id: any) {
    return await this.userRepository.findOne({ 
      select : ['id', 'fullname', 'email', 'phone_number', 'picture'],
      where: {
        id
      },
    });
  }
}
