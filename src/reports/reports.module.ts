import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Report } from './report.entity';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Comment } from '../comments/comment.entity';
import { Category } from '../categories/category.entity';
import { District } from '../districts/district.entity';
import { UsersModule } from 'src/users/users.module';
import { Vote } from 'src/votes/vote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report, Category, District, Comment, Vote]), // IMPORTANTE: registra todas las entidades usadas en repositorio
    UsersModule, 
  ],
  providers: [ReportsService],
  controllers: [ReportsController],
  exports: [ReportsService],
})
export class ReportsModule {}
