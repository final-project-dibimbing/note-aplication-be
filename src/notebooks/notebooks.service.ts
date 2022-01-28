import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotebookEntity } from 'src/entity/notebooks.entity';
import { NoteEntity } from 'src/entity/notes.entity';
import { NotesService } from 'src/notes/notes.service';
import { Connection, Like, Repository } from 'typeorm';

@Injectable()
export class NotebooksService {
  constructor(
    @InjectRepository(NotebookEntity)
    private notebookRepository: Repository<NotebookEntity>,
    private conection: Connection,
  ) {}

  public async addNotebook(data: any, user_id: number) {
    data['user_id'] = user_id;
    return await this.notebookRepository.save(data);
  }

  public async updateNotebook(data: any, user_id: number) {
    data['update_at'] = new Date();
    await this.checkData(data.id, user_id);
    return await this.notebookRepository.update({ id: data.id }, data);
  }

  public async deleteNotebook(id: number, user_id: number) {
    await this.conection.transaction(async (manager) => {
      await manager
        .getRepository(NoteEntity)
        .update(
          { notebook_id: id, delete_at: null },
          { delete_at: new Date() },
        );
      await manager
        .getRepository(NotebookEntity)
        .update({ id: id }, { delete_at: new Date() });
    });
    return 'deleted';
  }

  public async getNotebook(user_id: number) {
    return await this.conection.getRepository(NotebookEntity).find({ user_id });
  }

  public async searchNotebook(data: any, user_id: number) {
    const { sort } = data;
    let queryOrder = {};
    let whereOption = {
      user_id,
      delete_at : null,
    }
    if(data.name){
      whereOption['name'] = Like(`%${data.name}%`)
    }
    if (sort.name) {
      queryOrder['name'] = sort.name.toUpperCase();
    }
    if (sort.create_at) {
      queryOrder['create_at'] = sort.create_at.toUpperCase();
    }
    if (sort.update_at) {
      queryOrder['update_at'] = sort.update_at.toUpperCase();
    }
    return await this.conection.getRepository(NotebookEntity).find({
      where: whereOption,
      order: queryOrder,
    });
  }

  private async checkData(id: number, user_id: number) {
    const data = await this.notebookRepository.findOne({ id: id });

    if (!data) {
      throw new Error('Data tidak ditemukan !');
    } else {
      if (data.user_id.toString() !== user_id.toString()) {
        throw new UnauthorizedException();
      }
    }
    return true;
  }
}
