import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("note")
export class NoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  notebook_id: number;

  @Column({ length: 225,default:'Untitled' })
  title: string;

  @Column({ type : 'text'})
  content: string;

  @Column({default:false})
  publish: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' ,
  type: 'timestamp',})
  create_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' ,
  type: 'timestamp',})
  update_at: Date;

  @Column({default:null})
  delete_at: Date;
}