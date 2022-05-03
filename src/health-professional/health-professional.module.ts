import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  HealthProfessionalController,
  UserApiRepository,
  UserApiService,
} from './adapter/controller/health-professional.controller';
import { HealthProfessionalRepository } from './adapter/repository/health-professional.repository';
import { HealthProfessionalSchema } from './domain/schemas/health-professional.schema';
import { HealthProfessionalService } from './adapter/service/health-professional.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'HealthProfessional', schema: HealthProfessionalSchema },
    ]),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        //maxRedirects: 5
      }),
    }),
  ],
  controllers: [HealthProfessionalController],
  providers: [
    { provide: 'IUserApiRepository', useClass: UserApiRepository },
    {
      provide: 'HealthProfessionalInterfaceRepository',
      useClass: HealthProfessionalRepository,
    },
    {
      provide: 'HealthProfessionalInterfaceService',
      useClass: HealthProfessionalService,
    },
    { provide: 'IUserApiService', useClass: UserApiService },
  ],
})
export class HealthProfessionalModule {}
