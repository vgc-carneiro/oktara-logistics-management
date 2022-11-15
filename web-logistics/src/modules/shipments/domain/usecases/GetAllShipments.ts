import { IBaseUseCase } from '../../../../shared/interfaces/IBaseUseCase'
import { IShipment } from '../entities/IShipment'
import { IShipmentRepository } from '../repositories/IShipmentRepository'

export default class GetAllShipments implements IBaseUseCase<void, IShipment[]> {
  constructor(private readonly repository: IShipmentRepository) {}
  async execute() {
    return await this.repository.getAll()
  }
}
