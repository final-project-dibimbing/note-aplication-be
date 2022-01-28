// database.providers.tsJS

import { UserEntity } from 'src/entity/users.entity';
import { NoteEntity } from 'src/entity/notes.entity';
import { createConnection } from 'typeorm';
import { NotebookEntity } from 'src/entity/notebooks.entity';
import { ShareEntity } from 'src/entity/share.entity';
import { TagEntity } from 'src/entity/tags.entity';
import { MappingNoteTagEntity } from 'src/entity/mapping_note_tag.entity';

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
          UserEntity,
          NoteEntity,
          NotebookEntity,
          ShareEntity,
          TagEntity,
          MappingNoteTagEntity,
      ],
      synchronize: false,
      logging:true
    }),
  },
];