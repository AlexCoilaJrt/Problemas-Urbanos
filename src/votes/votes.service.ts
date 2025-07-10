// src/votes/votes.service.ts
import {
    Injectable,
    NotFoundException,
    BadRequestException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Vote } from './vote.entity';
  import { Repository } from 'typeorm';
  import { CreateVoteDto } from './dto/create-vote.dto';
  import { Report } from '../reports/report.entity';
  import { User } from '../users/user.entity';
  
  @Injectable()
  export class VotesService {
    constructor(
      @InjectRepository(Vote)
      private readonly voteRepo: Repository<Vote>,
      
      @InjectRepository(Report)
      private readonly reportRepo: Repository<Report>,
    ) {}
  
    async vote(dto: CreateVoteDto, user: User): Promise<{ total: number }> {
      const report = await this.reportRepo.findOneBy({ id: dto.reportId });
      if (!report) throw new NotFoundException('Reporte no encontrado');
  
      // Obtener el voto actual si existe
      const currentVote = await this.voteRepo.findOne({
        where: { user: { id: user.id }, report: { id: dto.reportId } },
      });
  
      if (currentVote && currentVote.value === dto.value) {
        // Si es el mismo valor, eliminar el voto (cancelar)
        await this.voteRepo.delete({ id: currentVote.id });
      } else {
        // Usar UPSERT para insertar o actualizar
        await this.voteRepo.manager.query(`
          INSERT INTO votes (value, "userId", "reportId")
          VALUES ($1, $2, $3)
          ON CONFLICT ("userId", "reportId") 
          DO UPDATE SET value = $1
        `, [dto.value, user.id, dto.reportId]);
      }
  
      // Devuelve el total de votos (suma)
      const total = await this.voteRepo
        .createQueryBuilder('v')
        .select('SUM(v.value)', 'sum')
        .where('v.reportId = :id', { id: dto.reportId })
        .getRawOne()
        .then((r) => Number(r.sum) || 0);
  
      return { total };
    }
  
    async getVotes(reportId: number): Promise<{ total: number }> {
      // Asegura que exista el reporte
      await this.reportRepo.findOneByOrFail({ id: reportId });
  
      const total = await this.voteRepo
        .createQueryBuilder('v')
        .select('SUM(v.value)', 'sum')
        .where('v.reportId = :id', { id: reportId })
        .getRawOne()
        .then((r) => Number(r.sum) || 0);
  
      return { total };
    }
  }