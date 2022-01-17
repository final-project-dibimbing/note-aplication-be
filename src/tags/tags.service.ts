import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from 'src/entity/tags.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
  ) {}

  public async addTag(data: any, user_id: string) {
    data['user_id'] = user_id;
    return await this.tagRepository.save(data);
  }

  public async updateTag(data: any, user_id) {
    data['update_at'] = new Date();
    await this.checkData(data.id, user_id);
    return await this.tagRepository.update({ id: data.id }, data);
  }

  public async deleteTag(id: number, user_id) {
    await this.checkData(id, user_id);
    return await this.tagRepository.delete(id);
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
