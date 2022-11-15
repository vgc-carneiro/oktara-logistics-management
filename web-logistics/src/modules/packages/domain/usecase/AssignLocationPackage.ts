import { IBaseUseCase } from '../../../../shared/interfaces/IBaseUseCase'
import { IPackageLocationDTO } from '../dtos/IPackageLocationDTO'
import { IPackage } from '../entities/IPackage'
import { IPackageRepository } from '../repositories/IPackageRepository'

export default class AssignLocationPackage implements IBaseUseCase<IPackageLocationDTO, IPackage> {
  constructor(private readonly repository: IPackageRepository) {}
  async execute(dto: IPackageLocationDTO): Promise<IPackage> {
    return await this.repository.assignLocation(dto)
  }
}
