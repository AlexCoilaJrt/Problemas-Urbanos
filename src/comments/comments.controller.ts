// src/comments/comments.controller.ts
import { Controller, Post, Body, UseGuards, Req, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() dto: CreateCommentDto, @Req() req: Request) {
    return this.commentsService.create(dto, req.user as any);
  }

  @Get('report/:reportId')
  async getComments(@Param('reportId') reportId: number) {
    return this.commentsService.findByReport(reportId);
  }
}
