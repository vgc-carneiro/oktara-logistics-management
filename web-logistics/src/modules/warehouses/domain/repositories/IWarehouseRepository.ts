import { IListResponseData } from '../../../../shared/types/IListResponseData'
import { IWarehouse } from '../entities/IWarehouse'

export interface IWarehouseRepository {
  getAll(): Promise<IListResponseData<IWarehouse>>
}
