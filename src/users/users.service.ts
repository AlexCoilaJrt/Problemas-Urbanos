import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepo.findOneBy({ id });
  }
  async update(id: number, dto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    
    Object.assign(user, dto);
    return this.userRepo.save(user);
  }
  
  async remove(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    
    return this.userRepo.remove(user);
  }
  
  
}
