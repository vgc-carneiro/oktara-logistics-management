export interface IRouteDTO {
  destination: ILocationDTO
  waypoints?: IWayPointDTO[]
}

export interface IWayPointDTO {
  location: ILocationDTO
}

export interface ILocationDTO {
  lat: number
  lng: number
}
