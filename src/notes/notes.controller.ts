import { Body, Controller, Delete, Post, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AddRequest, UpdateRequest } from './request/index.request';

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor() {}

  @Post('add')
  async add(@Body() data: AddRequest) {
    return true
  }

  @Put('update')
  async update(@Body() data : UpdateRequest){
      return true
  }

  @Delete('delete')
  @ApiQuery({"name" : "id"})
  async delete(@Query('id') id : number){
    return true
  }

  @Post('get')
  async get(@Body() data :any){
    return true
  }
}
