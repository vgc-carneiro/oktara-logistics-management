import { IBaseUseCase } from '../../../../shared/interfaces/IBaseUseCase'
import { IShipment } from '../entities/IShipment'
import { IShipmentRepository } from '../repositories/IShipmentRepository'

export default class CreateShipment implements IBaseUseCase<IShipment, IShipment> {
  constructor(private readonly repository: IShipmentRepository) {}
  async execute(dto: IShipment): Promise<IShipment> {
    return await this.repository.post(dto)
  }
}
