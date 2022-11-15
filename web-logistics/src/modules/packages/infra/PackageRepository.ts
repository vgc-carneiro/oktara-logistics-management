import { AxiosResponse } from 'axios'
import { ServiceConfig } from '../../../shared/services/ServiceConfig'
import { IPackageDTO } from '../domain/dtos/IPackageDTO'
import { IPackageLocationDTO } from '../domain/dtos/IPackageLocationDTO'
import { IPackageShipmentDTO } from '../domain/dtos/IPackageShipmentDTO'
import { IPackage } from '../domain/entities/IPackage'
import { IPackageRepository } from '../domain/repositories/IPackageRepository'

const http = new ServiceConfig()
export class PackageRepository implements IPackageRepository {
  async getAll(): Promise<IPackage[]> {
    const response: AxiosResponse<IPackage[]> = await http.get(`/packages`)
    return response.data
  }
  async post(dto: IPackageDTO): Promise<IPackage> {
    const response: AxiosResponse<IPackage> = await http.post(`/packages`, dto)
    return response.data
  }
  async get(id: string): Promise<IPackage> {
    const response: AxiosResponse<IPackage> = await http.get(`/packages/${id}`)
    return response.data
  }
  async assignLocation(dto: IPackageLocationDTO): Promise<IPackage> {
    try {
      const response: AxiosResponse<IPackage> = await http.patch(
        `/packages/${dto.packageID}/location/${dto.locationID}`,
      )
      return response.data
    } catch (error: any) {
      throw new Error(error.response.status + ' - ' + error.response.data.message)
    }
  }
  async putShipment(dto: IPackageShipmentDTO): Promise<IPackage> {
    const response: AxiosResponse<IPackage> = await http.patch(
      `/packages/${dto.packageID}/shipment/${dto.shipmentID}`,
    )
    return response.data
  }
  async deliverPackage(packageID: string): Promise<IPackage> {
    const response: AxiosResponse<IPackage> = await http.patch(`/packages/deliver/${packageID}`)
    return response.data
  }
}
