// src/votes/vote.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    Unique,
  } from 'typeorm';
  import { User } from '../users/user.entity';
  import { Report } from '../reports/report.entity';
  
  @Entity('votes')
  @Unique(['user', 'report'])
  export class Vote {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'int' })
    value: 1 | -1;
  
    @ManyToOne(() => User, (user) => user.votes, { eager: true })
    user: User;
  
    @ManyToOne(() => Report, (report) => report.votes, { onDelete: 'CASCADE' })
    report: Report;
  }
  