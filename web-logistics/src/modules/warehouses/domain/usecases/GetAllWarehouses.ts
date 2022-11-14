import { IBaseUseCase } from '../../../../shared/interfaces/IBaseUseCase'
import { IListResponseData } from '../../../../shared/types/IListResponseData'
import { WarehouseRepository } from '../../infra/WarehouseRepository'
import { IWarehouse } from '../entities/IWarehouse'

export default class GetAllWarehouses implements IBaseUseCase<void, IListResponseData<IWarehouse>> {
  constructor(private readonly repository: WarehouseRepository) {}
  async execute() {
    return await this.repository.getAll()
  }
}
