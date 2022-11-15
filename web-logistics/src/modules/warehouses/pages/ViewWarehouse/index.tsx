import { useEffect } from 'react'
import { Button } from '@mui/material'
import GetAllWarehouses from '../../domain/usecases/GetAllWarehouses'

interface Props {
  getAllWarehouses: GetAllWarehouses
}

const ViewWarehouse = ({ getAllWarehouses }: Props) => {
  useEffect(() => {
    const loadData = async () => {
      try {
        const resp = await getAllWarehouses.execute()

        console.log(resp)
      } catch (e: any) {
        console.log(e)
      }
    }
    loadData()
  }, [])

  return <Button variant="contained">List Warehouses</Button>
}

export default ViewWarehouse
