// database.providers.tsJS

import { UserEntity } from 'src/entity/users.entity';
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: '103.161.184.63',
      port: 3306,
      username: 'finaltest2',
      password: 'Password123!',
      database: 'final_project',
      entities: [
          UserEntity
      ],
      synchronize: true,
    }),
  },
];