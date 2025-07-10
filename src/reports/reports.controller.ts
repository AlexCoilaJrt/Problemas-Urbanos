import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    UseGuards,
    Req,
    UploadedFile,
    UseInterceptors,
    BadRequestException,
    ParseIntPipe,
    UnauthorizedException,
  } from '@nestjs/common';
  import { ReportsService } from './reports.service';
  import { UsersService } from '../users/users.service';
  import { JwtAuthGuard } from '../auth/jwt.guard';
  import { CreateReportDto } from './dto/create-report.dto';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { Request } from 'express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  
  @UseGuards(JwtAuthGuard)
  @Controller('reports')
  export class ReportsController {
    constructor(
      private readonly reportsService: ReportsService,
      private readonly usersService: UsersService,    // <-- Inyectamos UsersService
    ) {}
  
    @Post()
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './uploads',
          filename: (_req, file, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(
              Math.random() * 1e9,
            )}`;
            const ext = extname(file.originalname);
            cb(null, `${uniqueSuffix}${ext}`);
          },
        }),
        fileFilter: (_req, file, cb) => {
          if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            return cb(new BadRequestException('Solo se permiten imágenes'), false);
          }
          cb(null, true);
        },
        limits: { fileSize: 5 * 1024 * 1024 },
      }),
    )
    async createReport(
      @UploadedFile() file: Express.Multer.File,
      @Body() createReportDto: CreateReportDto,
      @Req() req: Request,
    ) {
      const payload = req.user as { userId: number; email: string; role: string };
  
      // 1) Busca al usuario completo en la base
      const user = await this.usersService.findById(payload.userId);
      if (!user) throw new UnauthorizedException('Usuario no encontrado');
  
      // 2) Construye la URL de la imagen (si subieron)
      const imageUrl = file ? `/uploads/${file.filename}` : undefined;
  
      // 3) Llama al servicio con el User real
      return this.reportsService.create(createReportDto, user, imageUrl);
    }
  
    @Get()
    async getAllReports() {
      return this.reportsService.findAll();
    }
  
    @Get(':id')
    async getReportById(@Param('id', ParseIntPipe) id: number) {
      return this.reportsService.findById(id);
    }
  }
  