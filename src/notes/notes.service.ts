import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MappingNoteTagEntity } from 'src/entity/mapping_note_tag.entity';
import { NoteEntity } from 'src/entity/notes.entity';
import { Connection, In, Not, Repository } from 'typeorm';
import { AddNoteRequest, UpdateNoteRequest } from './request/index.request';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NoteEntity)
    private noteRepository: Repository<NoteEntity>,
    private connection: Connection,
  ) {}

  public async addNote(data: AddNoteRequest, user_id: number) {
    data['user_id'] = user_id;
    this.connection.transaction(async (manager) => {
      const insertEntity = await manager.getRepository(NoteEntity).save(data);
      if (data.tags.length > 0) {
        const tags = [];
        for (let i = 0; i < data.tags.length; i++) {
          tags.push({
            tag_id: data.tags[i],
            note_id: insertEntity.id,
          });
        }
        await manager.getRepository(MappingNoteTagEntity).save(tags);
      }
    });
    return true;
  }

  public async updateNote(data: UpdateNoteRequest, user_id: number) {
    data['user_id'] = user_id;
    this.connection.transaction(async (manager) => {
      if (data.tags.length > 0) {
        await manager
          .getRepository(MappingNoteTagEntity)
          .update(
            { note_id: data.id, tag_id: Not(In(data.tags)) },
            { delete_at: new Date() },
          );
        await manager
          .getRepository(MappingNoteTagEntity)
          .update(
            { note_id: data.id, tag_id: In(data.tags) },
            { delete_at: null },
          );
      } else {
        await manager
          .getRepository(MappingNoteTagEntity)
          .update({ note_id: data.id }, { delete_at: new Date() });
      }
    });
    return true;
  }

  public async deleteNote(id: number, user_id: number) {
    this.connection.transaction(async (manager) => {
      await manager
        .getRepository(MappingNoteTagEntity)
        .update({ note_id: id }, { delete_at: new Date() });
      await manager
        .getRepository(NoteEntity)
        .update({ id: id }, { delete_at: new Date() });
    });
    return true
  }

  public async softDeleteNoteByNotebookId(notebook_id: number) {
    console.log('softDeleteNoteByNotebookId Sudah berhasil masuk');
    return await this.noteRepository.update(
      {
        notebook_id: notebook_id,
        delete_at: null,
      },
      { delete_at: new Date() },
    );
  }
}
