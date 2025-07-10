import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Report } from './report.entity';
  import { CreateReportDto } from './dto/create-report.dto';
  import { User } from '../users/user.entity';
  import { Category } from '../categories/category.entity';
  import { District } from '../districts/district.entity';
  
  @Injectable()
  export class ReportsService {
    constructor(
      @InjectRepository(Report)
      private readonly reportRepo: Repository<Report>,
  
      @InjectRepository(Category)
      private readonly categoryRepo: Repository<Category>,
  
      @InjectRepository(District)
      private readonly districtRepo: Repository<District>,
    ) {}
  
    async create(
      createReportDto: CreateReportDto,
      user: User,
      imageUrl?: string,
    ): Promise<Report> {
      const { title, description, status, categoryId, districtId } =
        createReportDto;
  
      const category = await this.categoryRepo.findOneBy({ id: categoryId });
      if (!category) throw new NotFoundException('Categoría no encontrada');
  
      const district = await this.districtRepo.findOneBy({ id: districtId });
      if (!district) throw new NotFoundException('Distrito no encontrado');
  
      const report = this.reportRepo.create({
        title,
        description,
        status,
        user,
        category,
        district,
        imageUrl: imageUrl || null,
      });
  
      return this.reportRepo.save(report);
    }
  
    async findAll(): Promise<Report[]> {
      return this.reportRepo.find({
        relations: ['user', 'category', 'district'],
        order: { created_at: 'DESC' },
      });
    }
  
    async findById(id: number): Promise<Report> {
      const report = await this.reportRepo.findOne({
        where: { id },
        relations: ['user', 'category', 'district'],
      });
      if (!report) throw new NotFoundException('Reporte no encontrado');
      return report;
    }
  
    async update(id: number, updateDto: Partial<CreateReportDto>) {
        const cleanedDto: Record<string, any> = {};
      
        for (const key in updateDto) {
          const value = updateDto[key as keyof CreateReportDto];
          if (value !== undefined && value !== null && value !== '') {
            cleanedDto[key] = value;
          }
        }
      
        if (Object.keys(cleanedDto).length === 0) {
          throw new BadRequestException('No se enviaron datos válidos para actualizar');
        }
      
        const result = await this.reportRepo.update(id, cleanedDto);
      
        if (result.affected === 0) {
          throw new NotFoundException('Reporte no encontrado');
        }
      
        return { message: 'Reporte actualizado correctamente' };
      }
      
  }
  