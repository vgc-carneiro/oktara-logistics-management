import { IBaseUseCase } from '../../../../shared/interfaces/IBaseUseCase'
import { IPackage } from '../entities/IPackage'
import { IPackageRepository } from '../repositories/IPackageRepository'

export default class PutPackageOnShipmentAvailable implements IBaseUseCase<string, IPackage> {
  constructor(private readonly repository: IPackageRepository) {}
  async execute(id: string): Promise<IPackage> {
    return await this.repository.putToShipmentAvailable(id)
  }
}
