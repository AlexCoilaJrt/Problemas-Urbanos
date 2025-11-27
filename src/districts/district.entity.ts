import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Report } from '../reports/report.entity';

@Entity('districts')
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })  // quitamos unique si no es necesario
  name: string;

  @Column({ length: 100, nullable: true })  // si region puede ser null, sino quita nullable
  region: string;

  @OneToMany(() => Report, report => report.district)
  reports: Report[];
}
