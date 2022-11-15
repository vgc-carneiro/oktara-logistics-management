import { PackageRepository } from '../../infra/PackageRepository'
import ListPackages from '../pages/ListPackages'
import GetAllPackages from '../usecase/GetAllPackages'

const ViewListPackagesFactory = () => {
  const packageRepository = new PackageRepository()

  const getAllPackages = new GetAllPackages(packageRepository)

  return <ListPackages getAllPackages={getAllPackages} />
}

export default ViewListPackagesFactory
