import { Body, Controller, Delete, Post, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AddShareRequest, UpdateShareRequest } from './request/index.request';

@ApiTags('Share')
@Controller('share')
export class ShareController {
  constructor() {}

  @Post('add')
  async add(@Body() data: AddShareRequest) {
    return true;
  }

  @Put('update')
  async update(@Body() data: UpdateShareRequest) {
    return true;
  }

  @Delete('delete')
  @ApiQuery({ name: 'id' })
  async delete(@Query('id') id: number) {
    return true;
  }

  @Post('get')
  async get(@Body() data: any) {
    return true;
  }
}
