import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MappingNoteTagEntity } from 'src/entity/mapping_note_tag.entity';
import { TagEntity } from 'src/entity/tags.entity';
import { Connection, Like, Repository } from 'typeorm';
import { SearchRequest } from './request/index.request';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
    private connection: Connection,
  ) {}

  public async addTag(data: any, user_id: string) {
    data['user_id'] = user_id;
    return await this.tagRepository.save(data);
  }

  public async updateTag(data: any, user_id: any) {
    data['update_at'] = new Date();
    return await this.tagRepository.update({ id: data.id }, data);
  }

  public async deleteTag(id: number, user_id: any) {
    this.connection.transaction(async (manager) => {
      await manager
        .getRepository(MappingNoteTagEntity)
        .update({ tag_id: id }, { delete_at: new Date() });
      await manager
        .getRepository(TagEntity)
        .update({ id }, { delete_at: new Date() });
    });
    return true;
  }

  public async getTags(user_id: number) {
    return await this.connection.getRepository(TagEntity).find({ user_id });
  }

  public async searchTag(data: SearchRequest, user_id: any) {
    const whereOption: any = await this.querySearch(data, user_id);
    console.log('whereOption >>', whereOption);
    return await this.connection.getRepository(TagEntity).find(whereOption);
  }

  private async querySearch(data: SearchRequest, user_id: number) {
    let queryExample = {
      where: {
        title: Like(`%${data.title}%`),
      },
      order: {
        title: 'ASC',
        id: 'DESC',
      },
    };

    const { title, sort, count } = data;
    let query = {
      where: {
        user_id,
        delete_at : null
      },
    };
    if (title) {
      query['where']['title'] = Like(`%${data.title}%`);
    }
    if (sort) {
      query['order'] = {
        title: sort.toUpperCase(),
      };
    }

    return query;
  }

  private async checkData(id: number, user_id: string) {
    const data = await this.tagRepository.findOne({
      where: {
        id,
      },
    });

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
