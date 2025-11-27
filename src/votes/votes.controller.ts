// src/votes/votes.controller.ts
import {
    Controller,
    Post,
    Body,
    UseGuards,
    Req,
    Get,
    Param,
    ParseIntPipe,
  } from '@nestjs/common';
  import { JwtAuthGuard } from '../auth/jwt.guard';
  import { VotesService } from './votes.service';
  import { CreateVoteDto } from './dto/create-vote.dto';
  import { Request } from 'express';
  
  @UseGuards(JwtAuthGuard)
  @Controller('votes')
  export class VotesController {
    constructor(private readonly votesService: VotesService) {}
  
    @Post()
    async vote(@Body() dto: CreateVoteDto, @Req() req: Request) {
      const user = req.user as any;
      return this.votesService.vote(dto, user);
    }
  
    @Get('report/:id')
    async getVotes(@Param('id', ParseIntPipe) id: number) {
      return this.votesService.getVotes(id);
    }
  }
  