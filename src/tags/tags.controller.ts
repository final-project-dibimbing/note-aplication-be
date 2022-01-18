import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Query,
  UseGuards,
  Headers,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MustGuard } from 'src/middleware/guard/must.guard';
import { RespSuccessInteceptor } from 'src/middleware/interceptor/resp-success.inteceptor';
import { AddTagRequest, SearchRequest, UpdateTagRequest } from './request/index.request';
import { TagsService } from './tags.service';

@UseInterceptors(RespSuccessInteceptor)
@ApiTags('Tags')
@UseGuards(MustGuard)
@ApiBearerAuth('token')
@Controller('tags')
export class TagsController {
  constructor(private service: TagsService) {}

  @Post('add')
  async add(@Body() data: AddTagRequest, @Headers() header: any) {
    return this.service.addTag(data, header.user.id);
  }

  @Put('update')
  async update(@Body() data: UpdateTagRequest,  @Headers() header: any) {
    return await this.service.updateTag(data, header.user.id);
  }

  @Delete('delete')
  @ApiQuery({ name: 'id' })
  async delete(@Query('id') id: number, @Headers() header: any) {
    return await this.service.deleteTag(id, header.user.id)
  }

  @Get('')
  async get(@Headers() header: any) {
    return await this.service.getTags(header.user.id);
  }

  @Post('search')
  async search(@Body() data:SearchRequest, @Headers() header: any){
    return await this.service.searchTag(data, header.user.id)
  }
}
