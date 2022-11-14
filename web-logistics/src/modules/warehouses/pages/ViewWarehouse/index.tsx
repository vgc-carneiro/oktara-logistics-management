import { useEffect } from 'react'
import GetAllWarehouses from '../../domain/usecases/GetAllWarehouses'

interface Props {
  getAllWarehouses: GetAllWarehouses
}

const ViewWarehouse = ({ getAllWarehouses }: Props) => {
  useEffect(() => {
    const loadData = async () => {
      console.log('running loaddata')
      try {
        const resp = await getAllWarehouses.execute()

        console.log(resp)
      } catch (e: any) {
        console.log(e)
      }
    }
    loadData()
  }, [])

  return <button>Teste Component</button>
}

export default ViewWarehouse
