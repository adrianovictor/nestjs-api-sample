import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthProfessionalModule } from './health-professional/health-professional.module';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
//import { APP_INTERCEPTOR } from '@nestjs/core';
//import { LoggingInterceptor } from './health-professional/adapter/controller/health-professional.controller';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    HealthProfessionalModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor,
    // },    
  ],
})
export class AppModule {}
