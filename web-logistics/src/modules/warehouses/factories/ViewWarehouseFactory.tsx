import GetAllWarehouses from '../domain/usecases/GetAllWarehouses'
import { WarehouseRepository } from '../infra/WarehouseRepository'
import ViewWarehouse from '../pages/ViewWarehouse'

const ViewWarehouseFactory = () => {
  const warehouseRepository = new WarehouseRepository()

  const getWarehouses = new GetAllWarehouses(warehouseRepository)

  return <ViewWarehouse getAllWarehouses={getWarehouses} />
}

export default ViewWarehouseFactory
