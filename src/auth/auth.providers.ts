import { UserEntity } from 'src/entity/users.entity';
import { Connection } from 'typeorm';

export const authProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(UserEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];