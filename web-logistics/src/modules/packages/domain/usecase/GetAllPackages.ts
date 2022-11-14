import { IBaseUseCase } from '../../../../shared/interfaces/IBaseUseCase'
import { IListResponseData } from '../../../../shared/types/IListResponseData'
import { IPackage } from '../entities/IPackage'
import { IPackageRepository } from '../repositories/IPackageRepository'

export default class GetAllPackages implements IBaseUseCase<void, IListResponseData<IPackage>> {
  constructor(private readonly repository: IPackageRepository) {}
  async execute() {
    return await this.repository.getAll()
  }
}
