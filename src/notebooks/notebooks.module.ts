import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/config/database.module';
import { NotebookEntity } from 'src/entity/notebooks.entity';
import { NoteEntity } from 'src/entity/notes.entity';
import { NotesModule } from 'src/notes/notes.module';
import { NotesService } from 'src/notes/notes.service';
import { NotebooksController } from './notebooks.controller';
import { NotebookProviders } from './notebooks.providers';
import { NotebooksService } from './notebooks.service';

@Module({
  imports : [ NotesModule,TypeOrmModule.forFeature([NotebookEntity,NoteEntity])],
  controllers: [NotebooksController],
  providers : [NotebooksService]
})
export class NotebooksModule {}
