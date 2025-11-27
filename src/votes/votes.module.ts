// src/votes/votes.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { Report } from '../reports/report.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vote, Report]),
    UsersModule,
  ],
  providers: [VotesService],
  controllers: [VotesController],
})
export class VotesModule {}
