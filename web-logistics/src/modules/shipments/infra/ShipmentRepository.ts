import { AxiosResponse } from 'axios'
import { ServiceConfig } from '../../../shared/services/ServiceConfig'
import { IShipment } from '../domain/entities/IShipment'
import { IShipmentRepository } from '../domain/repositories/IShipmentRepository'

const http = new ServiceConfig()
export class ShipmentRepository implements IShipmentRepository {
  async getAll(): Promise<IShipment[]> {
    const response: AxiosResponse<Promise<IShipment[]>> = await http.get(`/shipments`)
    return response.data
  }
  async post(dto: IShipment): Promise<IShipment> {
    const response: AxiosResponse<IShipment> = await http.post(`/shipments`, dto)
    return response.data
  }
  async get(id: string): Promise<IShipment> {
    const response: AxiosResponse<IShipment> = await http.get(`/shipments/${id}`)
    return response.data
  }
  async startDelivering(shipmentID: string): Promise<IShipment> {
    const response: AxiosResponse<IShipment> = await http.patch(
      `/shipments/start-delivering/${shipmentID}`,
    )
    return response.data
  }
}
