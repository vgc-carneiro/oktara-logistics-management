import DeliverPackage from '../../../packages/domain/usecase/DeliverPackage'
import { PackageRepository } from '../../../packages/infra/PackageRepository'
import { ShipmentRepository } from '../../infra/ShipmentRepository'
import ListShipment from '../pages/ListShipment'
import CreateShipment from '../usecases/CreateShipment'
import GetAllShipments from '../usecases/GetAllShipments'
import StartDeliveringShipment from '../usecases/StartDeliveringShipment'

const ViewListShipmentsFactory = () => {
  const shipmentRepository = new ShipmentRepository()
  const packageRepository = new PackageRepository()

  const getAllShipments = new GetAllShipments(shipmentRepository)
  const createShipment = new CreateShipment(shipmentRepository)
  const startDeliveringShipment = new StartDeliveringShipment(shipmentRepository)
  const deliverPackage = new DeliverPackage(packageRepository)

  return (
    <ListShipment
      getAllShipments={getAllShipments}
      createShipment={createShipment}
      startDeliveringShipment={startDeliveringShipment}
      deliverPackage={deliverPackage}
    />
  )
}

export default ViewListShipmentsFactory
