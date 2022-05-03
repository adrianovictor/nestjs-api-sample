import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HealthProfessional } from '../../domain/entity/health-professional';
import { HealthProfessionalInterfaceRepository } from '../../domain/repository/health-professional.interface.repository';
import { Model } from 'mongoose';

@Injectable()
export class HealthProfessionalRepository
  implements HealthProfessionalInterfaceRepository
{
  constructor(
    @InjectModel('HealthProfessional')
    private professionalModel: Model<HealthProfessional>,
  ) {}

  async findByEmail(email: string): Promise<HealthProfessional> {
    return await this.professionalModel.findOne({ email: email });
  }

  async findByCRM(crm: string): Promise<HealthProfessional> {
    return await this.professionalModel.findOne({ crm: crm });
  }

  async create(entity: HealthProfessional): Promise<string> {
    entity.createdAt = new Date();

    const result = await new this.professionalModel(entity).save();
    return result.id;
  }

  async getAll(): Promise<HealthProfessional[]> {
    return await this.professionalModel.find();
  }

  async findById(id: string): Promise<HealthProfessional> {
    return await this.professionalModel.findById(id);
  }

  async update(entity: HealthProfessional): Promise<boolean> {
    entity.updatedAt = new Date();

    const result = await new this.professionalModel(entity).update();
    return result.id;
  }

  async delete(entity: HealthProfessional): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
