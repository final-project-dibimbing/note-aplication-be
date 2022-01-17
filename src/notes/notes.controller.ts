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
import { NotesService } from './notes.service';
import { AddNoteRequest, UpdateNoteRequest } from './request/index.request';

@UseGuards(MustGuard)
@ApiBearerAuth('token')
@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(public service: NotesService) {}

  @Post('add')
  async add(@Body() data: AddNoteRequest, @Headers() header: any) {
    return await this.service.addNote(data, header.user.id);
  }

  @Put('update')
  async update(@Body() data: UpdateNoteRequest, @Headers() header: any) {
    return await this.service.updateNote(data, header.user.id)
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
