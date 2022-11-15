import { FunctionComponent } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ViewCreatePackageFactory from '../../modules/packages/domain/factories/ViewCreatePackageFactory'
import ViewListPackagesFactory from '../../modules/packages/domain/factories/ViewListPackagesFactory'

const MyRoutes: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<div></div>} />
      <Route path="packages">
        <Route index element={<ViewListPackagesFactory />} />
        <Route path="new" element={<ViewCreatePackageFactory />} />
      </Route>
      <Route path="shipments">
        <Route index element={<div>List of shipments</div>} />
        <Route path="new" element={<div>Add new shipment</div>} />
      </Route>
    </Routes>
  )
}

export default MyRoutes
