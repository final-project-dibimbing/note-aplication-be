import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Query,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MustGuard } from 'src/middleware/guard/must.guard';
import { AddTagRequest, UpdateTagRequest } from './request/index.request';
import { TagsService } from './tags.service';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private service: TagsService) {}

  @UseGuards(MustGuard)
  @ApiBearerAuth('token')
  @Post('add')
  async add(@Body() data: AddTagRequest, @Headers() header: any) {
    // const { user } = header;
    return this.service.addTag(data, header.user.id);
  }

  @UseGuards(MustGuard)
  @ApiBearerAuth('token')
  @Put('update')
  async update(@Body() data: UpdateTagRequest,  @Headers() header: any) {
    return await this.service.updateTag(data, header.user.id);
  }

  @UseGuards(MustGuard)
  @ApiBearerAuth('token')
  @Delete('delete')
  @ApiQuery({ name: 'id' })
  async delete(@Query('id') id: number, @Headers() header: any) {
    return await this.service.deleteTag(id, header.user.id)
  }

  @Post('get')
  async get(@Body() data: any) {
    return true;
  }
}
