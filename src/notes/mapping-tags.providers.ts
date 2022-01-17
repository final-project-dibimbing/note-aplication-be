import { MappingNoteTagEntity } from 'src/entity/mapping_note_tag.entity';
import { NoteEntity } from 'src/entity/notes.entity';
import { Connection } from 'typeorm';

export const MappingProviders = [
  {
    provide: 'MAPPING_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(MappingNoteTagEntity),
    inject: ['DATABASE_CONNECTION'],
  }
];
