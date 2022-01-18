import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/config/database.module';
import { MappingNoteTagEntity } from 'src/entity/mapping_note_tag.entity';
import { TagEntity } from 'src/entity/tags.entity';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  imports:[TypeOrmModule.forFeature([TagEntity, MappingNoteTagEntity])],
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}
