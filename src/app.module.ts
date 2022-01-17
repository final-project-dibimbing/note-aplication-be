import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NotebooksModule } from './notebooks/notebooks.module';
import { NotesModule } from './notes/notes.module';
import { TagsModule } from './tags/tags.module';
import { ShareModule } from './share/share.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/users.entity';
import { NoteEntity } from './entity/notes.entity';
import { NotebookEntity } from './entity/notebooks.entity';
import { ShareEntity } from './entity/share.entity';
import { TagEntity } from './entity/tags.entity';
import { MappingNoteTagEntity } from './entity/mapping_note_tag.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
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
      })
    ,
    UsersModule, DatabaseModule, AuthModule, NotebooksModule, NotesModule, TagsModule, ShareModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
