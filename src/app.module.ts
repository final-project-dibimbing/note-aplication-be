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


@Module({
  imports: [UsersModule, DatabaseModule, AuthModule, NotebooksModule, NotesModule, TagsModule, ShareModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
