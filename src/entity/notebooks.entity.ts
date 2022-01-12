import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("notebook")
export class NotebookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 225 })
  name: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' ,
  type: 'timestamp',})
  create_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' ,
  type: 'timestamp',})
  update_at: Date;

  @Column({default:null})
  delete_at: Date;
}