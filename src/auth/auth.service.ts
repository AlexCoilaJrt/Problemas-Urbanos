import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../users/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.userRepo.findOneBy({ email: dto.email });
    if (exists) throw new UnauthorizedException('Usuario ya registrado');
  
    const hashedPassword = await bcrypt.hash(dto.password, 10);
  
    const user = this.userRepo.create({
      name: dto.name,
      email: dto.email,
      password_hash: hashedPassword,
      role: dto.role || 'user',
    });
  
    await this.userRepo.save(user);
  
    return { message: 'Usuario registrado correctamente' };
  }
  

  generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };

    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
    });

    return { access_token, refresh_token };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOneBy({ email: dto.email });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const isMatch = await bcrypt.compare(dto.password, user.password_hash);
    if (!isMatch) throw new UnauthorizedException('Credenciales inválidas');

    return {
      ...this.generateTokens(user),
      message: `Sesión iniciada exitosamente, bienvenido ${user.name}`,
    };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
      const user = await this.userRepo.findOneBy({ id: payload.sub });
      if (!user) throw new UnauthorizedException('Usuario no encontrado');

      return this.generateTokens(user);
    } catch (e) {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }
}
