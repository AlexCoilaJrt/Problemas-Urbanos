import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from './district.entity';
import { Repository } from 'typeorm';
import { CreateDistrictDto } from './dto/create-district.dto';

@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(District)
    private readonly districtRepo: Repository<District>,
  ) {}

  async create(createDistrictDto: CreateDistrictDto): Promise<District> {
    const district = this.districtRepo.create(createDistrictDto);
    return this.districtRepo.save(district);
  }

  async findAll(): Promise<District[]> {
    return this.districtRepo.find();
  }

  async findById(id: number): Promise<District> {
    const district = await this.districtRepo.findOneBy({ id });
    if (!district) throw new NotFoundException('Distrito no encontrado');
    return district;
  }

  async update(id: number, updateDto: Partial<CreateDistrictDto>): Promise<District> {
    const district = await this.findById(id);
    Object.assign(district, updateDto);
    return this.districtRepo.save(district);
  }

  async remove(id: number): Promise<void> {
    await this.districtRepo.delete(id);
  }
}
