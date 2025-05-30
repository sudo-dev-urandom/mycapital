import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  type: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  @Column()
  userId: number;
}
