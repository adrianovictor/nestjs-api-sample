import { HealthProfessional } from '../entity/health-professional';

export interface InterfaceRepository<TEntity> {
    create(entity: TEntity): Promise<string>;
    getAll(): Promise<HealthProfessional[]>;
    findById(id: string): Promise<TEntity>;
    update(entity: TEntity): Promise<boolean>;
    delete(entity: TEntity): Promise<boolean>;
}
