import { ServiceConfig } from '../../../shared/services/ServiceConfig'
import { IWarehouse } from '../domain/entities/IWarehouse'
import { AxiosResponse } from 'axios'

const http = new ServiceConfig()
export class WarehouseRepository {
  async getAll(): Promise<IWarehouse[]> {
    const response: AxiosResponse<IWarehouse[]> = await http.get(`/warehouses`)
    return response.data
  }
}
