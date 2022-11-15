import GetAllWarehouses from '../../../warehouses/domain/usecases/GetAllWarehouses'
import { WarehouseRepository } from '../../../warehouses/infra/WarehouseRepository'
import { PackageRepository } from '../../infra/PackageRepository'
import AddPackages from '../pages/AddPackages'
import AssignLocationPackage from '../usecase/AssignLocationPackage'
import CreatePackage from '../usecase/CreatePackage'

const ViewCreatePackageFactory = () => {
  const packageRepository = new PackageRepository()
  const warehouseRepository = new WarehouseRepository()

  const createPackage = new CreatePackage(packageRepository)
  const getAllWarehouses = new GetAllWarehouses(warehouseRepository)
  const assignLocationPackage = new AssignLocationPackage(packageRepository)

  return (
    <AddPackages
      createPackage={createPackage}
      listWarehouse={getAllWarehouses}
      assignLocationPackage={assignLocationPackage}
    />
  )
}

export default ViewCreatePackageFactory
