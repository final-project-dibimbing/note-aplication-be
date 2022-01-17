import { Body, Controller, Delete, Headers, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MustGuard } from 'src/middleware/guard/must.guard';
import { NotebooksService } from './notebooks.service';
import { AddNotebooksRequest, UpdateNotebooksRequest } from './request/notebooks.request';

@ApiTags('Notebooks')
@UseGuards(MustGuard)
@ApiBearerAuth('token')
@Controller('notebooks')
export class NotebooksController {
  constructor(private service: NotebooksService) {}


  @Post('add')
  async add(@Body() data:AddNotebooksRequest, @Headers() header:any){
    return await this.service.addNotebook(data, header.user.id)
  }

  @Put('update')
  async update(@Body() data:UpdateNotebooksRequest, @Headers() header:any){
    return await this.service.updateNotebook(data, header.user.id)
  }


  @Delete('delete')
  @ApiQuery({ name: 'id' })
  async delete(@Query('id') id: number, @Headers() header: any) {
    console.log('controller delete sudah berhasil masuk',  header.user.id)
      return await this.service.deleteNotebook(id, header.user.id)
  }

  @Post('get')
  async get(@Body() data:AddNotebooksRequest, @Headers() header:any){
    
  }
}
