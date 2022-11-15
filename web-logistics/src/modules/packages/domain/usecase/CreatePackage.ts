import { IBaseUseCase } from '../../../../shared/interfaces/IBaseUseCase'
import { IPackageDTO } from '../dtos/IPackageDTO'
import { IPackage } from '../entities/IPackage'
import { IPackageRepository } from '../repositories/IPackageRepository'

export default class CreatePackage implements IBaseUseCase<IPackageDTO, IPackage> {
  constructor(private readonly repository: IPackageRepository) {}
  async execute(dto: IPackageDTO): Promise<IPackage> {
    const pakage = await this.repository.post(dto)
    return pakage
  }
}
