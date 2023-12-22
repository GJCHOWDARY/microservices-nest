import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import httpConfig from '../../../configs/http.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [httpConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '154.27.66.190',
      port: 3306,
      username: 'root',
      password: 'gnet!@#',
      database: 'educa1_get',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}