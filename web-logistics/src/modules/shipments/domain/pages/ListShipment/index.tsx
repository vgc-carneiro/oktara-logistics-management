import {
  AlertColor,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import PopInformation from '../../../../../shared/components/PopInformartion'
import StatusPackage from '../../../../../shared/components/StatusPackage'
import { EStatusPackage } from '../../../../packages/domain/entities/EStatusPackage'
import { IShipment } from '../../entities/IShipment'
import CreateShipment from '../../usecases/CreateShipment'
import GetAllShipments from '../../usecases/GetAllShipments'
import AddIcon from '@mui/icons-material/Add'
import InventoryIcon from '@mui/icons-material/Inventory'
import { IShipmentDTO } from '../../dtos/IShipmentDTO'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import StartDeliveringShipment from '../../usecases/StartDeliveringShipment'
import moment from 'moment'

interface Props {
  getAllShipments: GetAllShipments
  createShipment: CreateShipment
  startDeliveringShipment: StartDeliveringShipment
}

const ListShipment = ({ getAllShipments, createShipment, startDeliveringShipment }: Props) => {
  const [shipmentValues, setShipments] = useState([] as IShipment[])
  const [information, setInformation] = useState('')
  const [severityInformation, setSeverity] = useState('warning' as AlertColor)
  const [open, setOpen] = useState(true)

  const openCollapse = () => {
    setOpen(!open)
  }

  const checkStatus = (startRoute?: Date, finishedRoute?: Date) => {
    if (finishedRoute !== null) return EStatusPackage.DELIVERED
    if (startRoute !== null) return EStatusPackage.TRANSIT
    return EStatusPackage.WAREHOUSE
  }

  const loadData = async () => {
    try {
      setInformation('')
      const resp = await getAllShipments.execute()
      setShipments(resp)
    } catch (e: any) {
      setInformation('No Shipments were found.')
      console.log(e)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const showPopInformation = (message: string, severity: AlertColor = 'error') => {
    setSeverity(severity)
    setInformation(message)
    setTimeout(() => {
      setInformation('')
    }, 5000)
  }

  const handleClickNewShipment = async () => {
    try {
      await createShipment.execute({} as IShipmentDTO)
      showPopInformation('Shipment created succesfully!', 'success')
      loadData()
    } catch (error: any) {
      showPopInformation(
        error?.response?.status + '- ' + error?.response?.data?.message,
        'error' as AlertColor,
      )
    }
  }

  const startDelivery = async (id: string) => {
    try {
      await startDeliveringShipment.execute(id)
      showPopInformation('The truck left for delivery!', 'success')
      loadData()
    } catch (e) {
      showPopInformation('' + e, 'error')
      console.log(e)
    }
  }

  return (
    <Container maxWidth="xl">
      <Grid container direction={'row'}>
        <Grid item xs={10}>
          <PopInformation information={information} severityValue={severityInformation} />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickNewShipment}>
            Add Shipment
          </Button>
        </Grid>
      </Grid>
      <Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Total Packages</TableCell>
                  <TableCell align="center">Started Route At</TableCell>
                  <TableCell align="center">Estimated Duration Route</TableCell>
                  <TableCell align="center">Finished Route At</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shipmentValues.map(row => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center">
                      <StatusPackage
                        information={checkStatus(row.start_route, row.finished_route)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        startIcon={<InventoryIcon />}
                        onClick={openCollapse}
                      >
                        {row.packages?.length}
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      {row.start_route ? moment(row.start_route).format('DD/MM/yyyy hh:mm') : '-'}
                    </TableCell>
                    <TableCell align="center">
                      {row.estimated_route
                        ? moment(row.estimated_route).format('DD/MM/yyyy hh:mm')
                        : '-'}
                    </TableCell>
                    <TableCell align="center">
                      {row.finished_route
                        ? moment(row.finished_route).format('DD/MM/yyyy hh:mm')
                        : '-'}
                    </TableCell>
                    <TableCell align="center">
                      {row.start_route ? (
                        '-'
                      ) : (
                        <Button
                          variant="contained"
                          startIcon={<LocalShippingIcon />}
                          onClick={event => startDelivery(row.id)}
                        >
                          Start Delivery
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ListShipment
