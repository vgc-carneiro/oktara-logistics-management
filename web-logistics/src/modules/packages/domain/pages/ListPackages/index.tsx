import { Button } from '@mui/material'
import { useEffect } from 'react'
import GetAllPackages from '../../usecase/GetAllPackages'

interface Props {
  getAllPackages: GetAllPackages
}

const ListPackages = ({ getAllPackages }: Props) => {
  useEffect(() => {
    const loadData = async () => {
      try {
        const resp = await getAllPackages.execute()

        console.log(resp)
      } catch (e: any) {
        console.log(e)
      }
    }
    loadData()
  }, [])

  return <Button variant="contained">List Packages</Button>
}

export default ListPackages
