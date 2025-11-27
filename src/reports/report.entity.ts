// src/reports/report.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
  } from 'typeorm';
  
  import { User } from '../users/user.entity';
  import { Category } from '../categories/category.entity';
  import { District } from '../districts/district.entity';
  import { Comment } from '../comments/comment.entity';
  import { Vote } from '../votes/vote.entity';
  
  @Entity('reports')
  export class Report {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 255 })
    title: string;
  
    @Column('text')
    description: string;
  
    @Column({ type: 'varchar', length: 20, default: 'open' })
    status: 'open' | 'in_progress' | 'closed';
  
    @Column({ type: 'text', nullable: true })
    imageUrl: string | null;
  
    @ManyToOne(() => User, (user) => user.reports, { eager: true })
    user: User;
  
    @ManyToOne(() => Category, (category) => category.reports, { eager: true })
    category: Category;
  
    @ManyToOne(() => District, (district) => district.reports, { eager: true })
    district: District;
  
    // Relación inversa con Comment
    @OneToMany(() => Comment, (comment) => comment.report)
    comments: Comment[];
  
    // Relación inversa con Vote
    @OneToMany(() => Vote, (vote) => vote.report)
    votes: Vote[];
  
    @CreateDateColumn()
    created_at: Date;
  }
  