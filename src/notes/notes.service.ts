import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MappingNoteTagEntity } from 'src/entity/mapping_note_tag.entity';
import { NoteEntity } from 'src/entity/notes.entity';
import { Connection, Repository } from 'typeorm';
import { AddNoteRequest } from './request/index.request';

@Injectable()
export class NotesService {
  constructor(
   
    @InjectRepository(NoteEntity)
    private noteRepository: Repository<NoteEntity>,
    private connection:Connection
      ) {}

  public async addNote(data:AddNoteRequest, user_id : number){
      data['user_id'] = user_id
      this.connection.transaction(async manager => {
      const insertEntity = await manager.getRepository(NoteEntity).save(data)
      if(data.tags.length>0){
        const tags=[]
        for(let i=0; i<data.tags.length; i++){
          tags.push({
            tag_id:data.tags[i], 
            note_id:insertEntity.id
          })
        }
        await manager.getRepository(MappingNoteTagEntity).save(tags)
      }
      })
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
