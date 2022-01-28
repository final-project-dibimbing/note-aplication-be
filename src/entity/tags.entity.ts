import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ length: 225 })
  title: string;

  @Column({ default: true })
  status: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
  create_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
  update_at: Date;

  @Column({ default: null })
  delete_at: Date;
}
