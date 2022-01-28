import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database.module';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from 'src/entity/notes.entity';
import { MappingNoteTagEntity } from 'src/entity/mapping_note_tag.entity';

@Module({
  imports : [TypeOrmModule.forFeature([NoteEntity, MappingNoteTagEntity])],
  exports:[NotesService],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {}
