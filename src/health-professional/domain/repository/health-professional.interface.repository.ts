import { HealthProfessional } from '../entity/health-professional';
import { InterfaceRepository } from './interface-repository';

export interface HealthProfessionalInterfaceRepository
  extends InterfaceRepository<HealthProfessional> {
  findByEmail(email: string): Promise<HealthProfessional>;
  findByCRM(crm: string): Promise<HealthProfessional>;
}
