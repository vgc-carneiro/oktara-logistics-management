import { IBaseUseCase } from '../../../../shared/interfaces/IBaseUseCase'
import { IPackageShipmentDTO } from '../dtos/IPackageShipmentDTO'
import { IPackage } from '../entities/IPackage'
import { IPackageRepository } from '../repositories/IPackageRepository'

export default class PutPackageOnShipment implements IBaseUseCase<IPackageShipmentDTO, IPackage> {
  constructor(private readonly repository: IPackageRepository) {}
  async execute(dto: IPackageShipmentDTO): Promise<IPackage> {
    return await this.repository.putShipment(dto)
  }
}
