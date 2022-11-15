import { IWarehouse } from '../entities/IWarehouse'

export interface IWarehouseRepository {
  getAll(): Promise<IWarehouse[]>
}
