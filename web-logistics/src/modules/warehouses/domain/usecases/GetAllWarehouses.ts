import { IBaseUseCase } from '../../../../shared/interfaces/IBaseUseCase'
import { IListResponseData } from '../../../../shared/types/IListResponseData'
import { IWarehouse } from '../entities/IWarehouse'
import { IWarehouseRepository } from '../repositories/IWarehouseRepository'

export default class GetAllWarehouses implements IBaseUseCase<void, IListResponseData<IWarehouse>> {
  constructor(private readonly repository: IWarehouseRepository) {}
  async execute() {
    return await this.repository.getAll()
  }
}
