import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MustGuard } from 'src/middleware/guard/must.guard';
import { RespSuccessInteceptor } from 'src/middleware/interceptor/resp-success.inteceptor';
import { NotebooksService } from './notebooks.service';
import {
  AddNotebooksRequest,
  SearchNotebooksRequest,
  UpdateNotebooksRequest,
} from './request/notebooks.request';

@UseInterceptors(RespSuccessInteceptor)
@ApiTags('Notebooks')
@UseGuards(MustGuard)
@ApiBearerAuth('token')
@Controller('notebooks')
export class NotebooksController {
  constructor(private service: NotebooksService) {}

  @Post('add')
  async add(@Body() data: AddNotebooksRequest, @Headers() header: any) {
    return await this.service.addNotebook(data, header.user.id);
  }

  @Put('update')
  async update(@Body() data: UpdateNotebooksRequest, @Headers() header: any) {
    return await this.service.updateNotebook(data, header.user.id);
  }

  @Delete('delete')
  @ApiQuery({ name: 'id' })
  async delete(@Query('id') id: number, @Headers() header: any) {
    return await this.service.deleteNotebook(id, header.user.id);
  }

  @Get('')
  async get(@Headers() header: any) {
    return await this.service.getNotebook(header.user.id)
  }

  @Post('search')
  async search(@Body() data:SearchNotebooksRequest, @Headers() header:any){
    return await this.service.searchNotebook(data, header.user.id)
  }
}
