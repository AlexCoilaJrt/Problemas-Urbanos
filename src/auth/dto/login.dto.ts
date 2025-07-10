// src/auth/dto/login.dto.ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'El correo debe ser válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  password: string;
}
