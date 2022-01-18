import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MappingNoteTagEntity } from 'src/entity/mapping_note_tag.entity';
import { TagEntity } from 'src/entity/tags.entity';
import { Connection, Repository } from 'typeorm';

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

  public async updateTag(data: any, user_id) {
    data['update_at'] = new Date();
    return await this.tagRepository.update({ id: data.id }, data);
  }

  public async deleteTag(id: number, user_id) {
    this.connection.transaction(async (manager) => {
      await manager
        .getRepository(MappingNoteTagEntity)
        .update({ tag_id: id }, { delete_at: new Date() });
      await manager
        .getRepository(TagEntity)
        .update({ id }, { delete_at: new Date() });
    });
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
