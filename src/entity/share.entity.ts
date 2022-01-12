import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("share")
export class ShareEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 225 })
  title: string;

  @Column()
  status: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' ,
  type: 'timestamp',})
  create_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' ,
  type: 'timestamp',})
  update_at: Date;

  @Column({default:null})
  delete_at: Date;
}