import { ServiceConfig } from '../../../shared/services/ServiceConfig'
import { IListResponseData } from '../../../shared/types/IListResponseData'
import { IWarehouse } from '../domain/entities/IWarehouse'
import { AxiosResponse } from 'axios'

const http = new ServiceConfig()
export class WarehouseRepository {
  async getAll(): Promise<IListResponseData<IWarehouse>> {
    const response: AxiosResponse<IListResponseData<IWarehouse>> = await http.get(`/warehouses`)
    return response.data
  }
}
