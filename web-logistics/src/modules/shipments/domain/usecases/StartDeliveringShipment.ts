import { IBaseUseCase } from '../../../../shared/interfaces/IBaseUseCase'
import { IShipment } from '../entities/IShipment'
import { IShipmentRepository } from '../repositories/IShipmentRepository'

export default class StartDeliveringShipment implements IBaseUseCase<string, IShipment> {
  constructor(private readonly repository: IShipmentRepository) {}
  async execute(id: string): Promise<IShipment> {
    return await this.repository.startDelivering(id)
  }
}
