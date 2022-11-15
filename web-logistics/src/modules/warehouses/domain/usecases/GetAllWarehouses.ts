import { IBaseUseCase } from '../../../../shared/interfaces/IBaseUseCase'
import { IWarehouse } from '../entities/IWarehouse'
import { IWarehouseRepository } from '../repositories/IWarehouseRepository'

export default class GetAllWarehouses implements IBaseUseCase<void, IWarehouse[]> {
  constructor(private readonly repository: IWarehouseRepository) {}
  async execute() {
    return await this.repository.getAll()
  }
}
