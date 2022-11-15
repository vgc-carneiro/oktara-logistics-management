import { IBaseUseCase } from '../../../../shared/interfaces/IBaseUseCase'
import { IShipmentDTO } from '../dtos/IShipmentDTO'
import { IShipment } from '../entities/IShipment'
import { IShipmentRepository } from '../repositories/IShipmentRepository'

export default class CreateShipment implements IBaseUseCase<IShipment, IShipment> {
  constructor(private readonly repository: IShipmentRepository) {}
  async execute(dto: IShipmentDTO): Promise<IShipment> {
    return await this.repository.post(dto)
  }
}
