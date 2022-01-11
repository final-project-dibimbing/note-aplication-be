import { Injectable, Inject  } from '@nestjs/common';
import { UserEntity } from 'src/entity/users.entity';
import { Repository } from 'typeorm';
import { SignUpReq } from './request/sign-up.request';


@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<UserEntity>,
    ){}

    public async signUp(data: SignUpReq){
        data['status'] = true
        data['picture'] =""
    
        const saveUser = await this.userRepository.save(data)
        console.log('saveUser >', saveUser)
        return "OK BERHASIL"
    }
}
