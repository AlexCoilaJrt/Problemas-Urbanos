import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    UseGuards,
  } from '@nestjs/common';
  import { CategoriesService } from './categories.service';
  import { CreateCategoryDto } from './dto/category.dto';
  import { JwtAuthGuard } from '../auth/jwt.guard';
  import { RolesGuard } from '../auth/roles.guard';
  import { Roles } from '../auth/roles.decorator';
  import { Role } from '../users/roles.enum';
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Controller('categories')
  export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
  
    @Roles(Role.Admin)
    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto) {
      return this.categoriesService.create(createCategoryDto);
    }
  
    @Get()
    async findAll() {
      return this.categoriesService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: number) {
      return this.categoriesService.findById(id);
    }
  
    @Roles(Role.Admin)
    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateDto: Partial<CreateCategoryDto>) {
      return this.categoriesService.update(id, updateDto);
    }
  
    @Roles(Role.Admin)
    @Delete(':id')
    async remove(@Param('id') id: number) {
      await this.categoriesService.remove(id);
      return { message: 'Categoría eliminada correctamente' };
    }
  }
  