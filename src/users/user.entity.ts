// src/users/user.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
  } from 'typeorm';
  
  import { Report } from '../reports/report.entity';
  import { Comment } from '../comments/comment.entity';
  import { Vote } from '../votes/vote.entity';
  
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    password_hash: string;
  
    @Column({ default: 'user' })
    role: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    // Un usuario puede tener muchos comentarios
    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];
  
    // Un usuario puede tener muchos votos
    @OneToMany(() => Vote, (vote) => vote.user)
    votes: Vote[];
  
    // Un usuario puede crear muchos reportes
    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];
  }
  