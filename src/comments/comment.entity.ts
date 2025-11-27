import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { User } from '../users/user.entity';
  import { Report } from '../reports/report.entity';
  
  @Entity()
  export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    content: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @ManyToOne(() => User, (user) => user.comments, { eager: true })
    user: User;
  
    @ManyToOne(() => Report, (report) => report.comments, { onDelete: 'CASCADE' })
    report: Report;
  }
  