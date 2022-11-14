import { IBaseUseCase } from '../../../../shared/interfaces/IBaseUseCase'
import { IPackage } from '../entities/IPackage'
import { IPackageRepository } from '../repositories/IPackageRepository'

export default class CreatePackage implements IBaseUseCase<IPackage, IPackage> {
  constructor(private readonly repository: IPackageRepository) {}
  async execute(dto: IPackage): Promise<IPackage> {
    return await this.repository.post(dto)
  }
}
