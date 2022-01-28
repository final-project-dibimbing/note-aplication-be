import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 225 })
  fullname: string;

  @Column({ length: 225 })
  email: string;

  @Column({ length: 225 })
  password: string;

  @Column()
  status: boolean;

  @Column({ length: 15 })
  phone_number: string;

  @Column({ length: 225 })
  picture: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' ,
  type: 'timestamp',})
  create_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' ,
  type: 'timestamp',})
  update_at: Date;

  @Column({default:null})
  delete_at: Date;
}