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
  import { DistrictsService } from './districts.service';
  import { CreateDistrictDto } from './dto/create-district.dto';
  import { JwtAuthGuard } from '../auth/jwt.guard';
  import { RolesGuard } from '../auth/roles.guard';
  import { Roles } from '../auth/roles.decorator';
  import { Role } from '../users/roles.enum';
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Controller('districts')
  export class DistrictsController {
    constructor(private readonly districtsService: DistrictsService) {}
  
    @Roles(Role.Admin)
    @Post()
    async create(@Body() createDistrictDto: CreateDistrictDto) {
      return this.districtsService.create(createDistrictDto);
    }
  
    @Get()
    async findAll() {
      return this.districtsService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: number) {
      return this.districtsService.findById(id);
    }
  
    @Roles(Role.Admin)
    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateDto: Partial<CreateDistrictDto>) {
      return this.districtsService.update(id, updateDto);
    }
  
    @Roles(Role.Admin)
    @Delete(':id')
    async remove(@Param('id') id: number) {
      await this.districtsService.remove(id);
      return { message: 'Distrito eliminado correctamente' };
    }
  }
  