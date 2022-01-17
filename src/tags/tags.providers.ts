import { TagEntity } from 'src/entity/tags.entity';
import { Connection } from 'typeorm';

export const TagProviders = [
  {
    provide: 'TAG_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(TagEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];