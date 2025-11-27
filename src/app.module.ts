import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { DistrictsModule } from './districts/districts.module';
import { ReportsModule } from './reports/reports.module';
import { CommentsModule } from './comments/comments.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true, // Esto carga todas las entidades que estén registradas
        synchronize: true, // Solo para desarrollo, desactivar en producción
      }),
      inject: [ConfigService],
    }),

    AuthModule,
    UsersModule,
    CategoriesModule,
    ReportsModule,
    DistrictsModule,
    CommentsModule,
    VotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
