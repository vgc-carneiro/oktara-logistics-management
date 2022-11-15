import { ShipmentRepository } from '../../infra/ShipmentRepository'
import ListShipment from '../pages/ListShipment'
import CreateShipment from '../usecases/CreateShipment'
import GetAllShipments from '../usecases/GetAllShipments'

const ViewListShipmentsFactory = () => {
  const shipmentRepository = new ShipmentRepository()

  const getAllShipments = new GetAllShipments(shipmentRepository)
  const createShipment = new CreateShipment(shipmentRepository)

  return <ListShipment getAllShipments={getAllShipments} createShipment={createShipment} />
}

export default ViewListShipmentsFactory
