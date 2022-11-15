import { ILocation } from './ILocation'

export interface IWarehouse {
  id: string
  name: string
  latitude: number
  longitude: number
  locations: ILocation[]
}
