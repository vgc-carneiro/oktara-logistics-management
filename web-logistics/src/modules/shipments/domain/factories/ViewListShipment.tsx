import { ShipmentRepository } from '../../infra/ShipmentRepository'
import ListShipment from '../pages/ListShipment'
import CreateShipment from '../usecases/CreateShipment'
import GetAllShipments from '../usecases/GetAllShipments'
import StartDeliveringShipment from '../usecases/StartDeliveringShipment'

const ViewListShipmentsFactory = () => {
  const shipmentRepository = new ShipmentRepository()

  const getAllShipments = new GetAllShipments(shipmentRepository)
  const createShipment = new CreateShipment(shipmentRepository)
  const startDeliveringShipment = new StartDeliveringShipment(shipmentRepository)

  return (
    <ListShipment
      getAllShipments={getAllShipments}
      createShipment={createShipment}
      startDeliveringShipment={startDeliveringShipment}
    />
  )
}

export default ViewListShipmentsFactory
