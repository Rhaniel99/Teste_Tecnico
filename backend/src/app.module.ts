import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevelopersModule } from './developers/developers.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',     // <— nome do serviço no docker-compose
      port: 5432,           // <— porta interna do container Postgres
      username: 'user',
      password: 'password',
      database: 'db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    DevelopersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
