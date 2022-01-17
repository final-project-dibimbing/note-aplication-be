import { NotebookEntity } from 'src/entity/notebooks.entity';
import { Connection } from 'typeorm';

export const NotebookProviders = [
  {
    provide: 'NOTEBOOK_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(NotebookEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];