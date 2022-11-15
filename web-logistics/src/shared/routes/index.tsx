import { FunctionComponent } from 'react'
import { Routes, Route } from 'react-router-dom'
import ViewCreatePackageFactory from '../../modules/packages/domain/factories/ViewCreatePackageFactory'
import ViewListPackagesFactory from '../../modules/packages/domain/factories/ViewListPackagesFactory'
import ViewListShipmentsFactory from '../../modules/shipments/domain/factories/ViewListShipment'

const MyRoutes: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<div></div>} />
      <Route path="packages">
        <Route index element={<ViewListPackagesFactory />} />
        <Route path="new" element={<ViewCreatePackageFactory />} />
      </Route>
      <Route path="shipments">
        <Route index element={<ViewListShipmentsFactory />} />
      </Route>
    </Routes>
  )
}

export default MyRoutes
