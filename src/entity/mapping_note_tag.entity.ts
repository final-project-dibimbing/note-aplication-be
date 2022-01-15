import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("mapping_note_tag")
export class MappingNoteTagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  note_id: number;

  @Column()
  tag_id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' ,
  type: 'timestamp',})
  create_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' ,
  type: 'timestamp',})
  update_at: Date;

  @Column({default:null})
  delete_at: Date;
}
