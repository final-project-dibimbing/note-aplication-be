import { Injectable, Inject } from '@nestjs/common';
import { UserEntity } from 'src/entity/users.entity';
import { Repository } from 'typeorm';
import { SignUpReq } from './request/sign-up.request';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  public async signUp(data: SignUpReq) {
    data['status'] = true;
    data['picture'] = '';
    data['password'] = await this.hash(data.password);

    const saveUser = await this.userRepository.save(data);
    console.log('saveUser >', saveUser);
    return 'OK BERHASIL';
  }

  public async signIn(data: any) {
    const user = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (!user) throw new Error('User not found');
    if (!(await this.compare(data.password, user.password)))
      throw new Error('Invalid email or password');

    return await jwt.sign(
      {
        id: user.id,
        username: user.fullname,
        address: user.email,
        phone_number: user.phone_number,
      },
      'SECRET', //process.env.SECRET
    );
  }

  private async hash(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    return hash;
  }

  private async compare(s: string, hash: string) {
    return await bcrypt.compareSync(s.toString(), hash);
  }
}
