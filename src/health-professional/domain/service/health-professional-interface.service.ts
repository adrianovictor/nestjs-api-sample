import { CreateHealthProfessionalDto } from '../dto/requests/create-health-professional.dto';

export interface HealthProfessionalInterfaceService {
  create(entity: CreateHealthProfessionalDto): Promise<string>;
}
