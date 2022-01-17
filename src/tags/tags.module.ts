import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database.module';
import { TagsController } from './tags.controller';
import { TagProviders } from './tags.providers';
import { TagsService } from './tags.service';

@Module({
  imports:[DatabaseModule],
  controllers: [TagsController],
  providers: [TagsService, ...TagProviders]
})
export class TagsModule {}
