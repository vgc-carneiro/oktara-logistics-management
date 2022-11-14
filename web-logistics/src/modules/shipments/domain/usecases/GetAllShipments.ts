import { IBaseUseCase } from '../../../../shared/interfaces/IBaseUseCase'
import { IListResponseData } from '../../../../shared/types/IListResponseData'
import { IShipment } from '../entities/IShipment'
import { IShipmentRepository } from '../repositories/IShipmentRepository'

export default class GetAllShipments implements IBaseUseCase<void, IListResponseData<IShipment>> {
  constructor(private readonly repository: IShipmentRepository) {}
  async execute() {
    return await this.repository.getAll()
  }
}
