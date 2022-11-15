import { PackageRepository } from '../../infra/PackageRepository'
import ListPackages from '../pages/ListPackages'
import GetAllPackages from '../usecase/GetAllPackages'
import PutPackageOnShipmentAvailable from '../usecase/PutPackageOnShipmentAvailable'

const ViewListPackagesFactory = () => {
  const packageRepository = new PackageRepository()

  const getAllPackages = new GetAllPackages(packageRepository)
  const putPackageOnShipmentAvailable = new PutPackageOnShipmentAvailable(packageRepository)

  return (
    <ListPackages
      getAllPackages={getAllPackages}
      putPackageOnShipmentAvailable={putPackageOnShipmentAvailable}
    />
  )
}

export default ViewListPackagesFactory
