import { IsString, IsNotEmpty, IsEnum, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(['open', 'in_progress', 'closed'])
  status: 'open' | 'in_progress' | 'closed';

  @Type(() => Number)
  @IsInt()
  categoryId: number;

  @Type(() => Number)
  @IsInt()
  districtId: number;
}
