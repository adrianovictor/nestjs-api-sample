import { Inject, Injectable } from '@nestjs/common';
import { CreateHealthProfessionalDto } from '../../domain/dto/requests/create-health-professional.dto';
import { HealthProfessional } from '../../domain/entity/health-professional';
import { HealthProfessionalInterfaceRepository } from '../../domain/repository/health-professional.interface.repository';
import { HealthProfessionalInterfaceService } from '../../domain/service/health-professional-interface.service';

@Injectable()
export class HealthProfessionalService
  implements HealthProfessionalInterfaceService
{
  constructor(
    @Inject('HealthProfessionalInterfaceRepository')
    private healthProRepository: HealthProfessionalInterfaceRepository,
  ) {}

  async create(entity: CreateHealthProfessionalDto): Promise<any> {
    return await this.healthProRepository.create(
      HealthProfessional.create(
        entity.name,
        entity.email,
        entity.phoneNumber,
        entity.cellPhone,
      ),
    );
  }

  // async getById(id: string): Promise<HealthProfessional> {
  //     const test = await this.getByEmail('profissional.teste@exemple.com');
  //     console.log(test);
  //     return await this.professionalModel.findById(id);
  // }

  // async getByEmail(email: string): Promise<HealthProfessional> {
  //     return await this.professionalModel.findOne({ email: email });
  // }
}
