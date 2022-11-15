import { Chip } from '@mui/material'
import { EStatusPackage } from '../../../modules/packages/domain/entities/EStatusPackage'
import WarehouseIcon from '@mui/icons-material/Warehouse'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import { ReactElement } from 'react'

interface Props {
  information: EStatusPackage
}

const checkStatus = (status: EStatusPackage) => {
  switch (status) {
    case EStatusPackage.WAREHOUSE:
      return [<WarehouseIcon />, 'Warehouse']
    case EStatusPackage.TRANSIT:
      return [<LocalShippingIcon />, 'In Transit']
    case EStatusPackage.DELIVERED:
      return [<HomeWorkIcon />, 'Delivered']
  }
}

const StatusPackage = ({ information }: Props) => {
  const [iconToShow, status] = checkStatus(information)
  return <Chip icon={iconToShow as ReactElement} label={status} />
}

export default StatusPackage
