// src/comments/comments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository, InsertResult } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Report } from '../reports/report.entity';
import { User } from '../users/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Report)
    private readonly reportRepo: Repository<Report>,
  ) {}

  async create(dto: CreateCommentDto, user: User): Promise<Comment> {
    // 1) Verificar que el reporte exista
    const report = await this.reportRepo.findOneBy({ id: dto.reportId });
    if (!report) throw new NotFoundException('Reporte no encontrado');

    // 2) Insertar directamente
    const insertResult: InsertResult = await this.commentRepo.insert({
      content: dto.content,
      report,
      user,
    });

    const newCommentId = insertResult.identifiers[0].id as number;

    // 3) Recuperar el comentario con sus relaciones y devolverlo
    const comment = await this.commentRepo.findOne({
      where: { id: newCommentId },
      relations: ['user', 'report'],
    });

    return comment!;
  }

  async findByReport(reportId: number): Promise<Comment[]> {
    return this.commentRepo.find({
      where: { report: { id: reportId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }
}
