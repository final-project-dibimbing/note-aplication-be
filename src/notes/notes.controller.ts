import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Query,
  UseGuards,
  Headers,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MustGuard } from 'src/middleware/guard/must.guard';
import { RespSuccessInteceptor } from 'src/middleware/interceptor/resp-success.inteceptor';
import { NotesService } from './notes.service';
import { AddNoteRequest, SearchNoteRequest, UpdateNoteRequest } from './request/index.request';

@UseInterceptors(RespSuccessInteceptor)
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
    return await this.service.deleteNote(id);
  }

  @Get('')
  async get(@Headers() header: any) {
    return await this.service.getNote(header.user.id);
  }

  @Post('search')
  async search(@Body() data: SearchNoteRequest, @Headers() header: any){
    return await this.service.searchNote(data, header.user.id)
  }
}
