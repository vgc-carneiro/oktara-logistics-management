import {
  AlertColor,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Container } from '@mui/system'
import { SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import PopInformation from '../../../../../shared/components/PopInformartion'
import StatusPackage from '../../../../../shared/components/StatusPackage'
import { EStatusPackage } from '../../../../packages/domain/entities/EStatusPackage'
import { IShipment } from '../../entities/IShipment'
import CreateShipment from '../../usecases/CreateShipment'
import GetAllShipments from '../../usecases/GetAllShipments'
import AddIcon from '@mui/icons-material/Add'
import InventoryIcon from '@mui/icons-material/Inventory'
import RouteIcon from '@mui/icons-material/Route'
import { IShipmentDTO } from '../../dtos/IShipmentDTO'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import StartDeliveringShipment from '../../usecases/StartDeliveringShipment'
import moment from 'moment'
import DeliverPackage from '../../../../packages/domain/usecase/DeliverPackage'
import { IRouteDTO, IWayPointDTO } from '../../../../../shared/components/Map/dto/IRouteDTO'
import { IPackage } from '../../../../packages/domain/entities/IPackage'
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { GoogleMapsKey } from '../../../../../shared/components/Map/key'

interface Props {
  getAllShipments: GetAllShipments
  createShipment: CreateShipment
  startDeliveringShipment: StartDeliveringShipment
  deliverPackage: DeliverPackage
}

const ListShipment = ({
  getAllShipments,
  createShipment,
  startDeliveringShipment,
  deliverPackage,
}: Props) => {
  const [shipmentValues, setShipments] = useState([] as IShipment[])
  const [information, setInformation] = useState('')
  const [severityInformation, setSeverity] = useState('warning' as AlertColor)
  const [openValue, setOpen] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [route, setRoute] = useState<IRouteDTO | null>(null)
  const defaultLocation: google.maps.LatLngLiteral = { lat: 9.947525, lng: -84.121088 }
  const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(defaultLocation)
  const [destination, setDestination] = useState<google.maps.LatLngLiteral | null>(null)
  const [waypoints, setWaypoints] = useState<google.maps.DirectionsWaypoint[] | null>(null)
  const [response, setResponse] = useState(null)
  const key = GoogleMapsKey

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height: 450,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflowY: 'scroll',
    p: 4,
  }

  const openModal = (open: boolean) => {
    setOpen(open)
  }
  const closeModal = () => setOpen(false)

  const checkStatus = (startRoute?: Date, finishedRoute?: Date): EStatusPackage => {
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
      openModal(false)
      await createShipment.execute({} as IShipmentDTO)
      showPopInformation('Shipment created succesfully!', 'success')
      setDestination(null)
      setWaypoints(null)
      setResponse(null)
      setShowMap(false)
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
    } catch (e: any) {
      showPopInformation(
        e?.response?.status + '- ' + e?.response?.data?.message,
        'error' as AlertColor,
      )
    }
  }

  const confirmDelivery = async (id: string) => {
    try {
      await deliverPackage.execute(id)
      loadData()
    } catch (e) {
      showPopInformation('' + e, 'error')
      console.log(e)
    }
  }

  const basicCard = (
    latitude: number,
    longitude: number,
    distance: number,
    id: string,
    delivery: boolean,
    status: EStatusPackage,
  ) => {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Latitude: {latitude}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Longitude: {longitude}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Distance from Warehouse: {distance} KM
          </Typography>
        </CardContent>
        <CardActions>
          {delivery ? (
            <Button size="small" variant="contained" onClick={event => confirmDelivery(id)}>
              Confirm delivery
            </Button>
          ) : (
            <StatusPackage information={status} />
          )}
        </CardActions>
      </Card>
    )
  }

  const generateRoute = (id: string) => {
    const shipmentToRoute = shipmentValues.filter(obj => obj.id === id)[0]
    if (!shipmentToRoute.packages) return
    setShowMap(true)
    const copyPackages = [...shipmentToRoute.packages]

    const lastPackage = copyPackages.pop() as IPackage
    const waypoints = copyPackages

    const waypointsInMount: IWayPointDTO[] = []

    waypoints?.map(waypoint => {
      waypointsInMount.push({
        location: {
          lat: +waypoint.latitude_destination,
          lng: +waypoint.longitude_destination,
        },
      })
    })

    setWaypoints(waypointsInMount)

    setDestination({
      lat: +lastPackage?.latitude_destination,
      lng: +lastPackage?.longitude_destination,
    })
  }

  const directionServiceOptions =
    // @ts-ignore
    useMemo<google.maps.DirectionsRequest>(() => {
      return {
        origin,
        destination,
        waypoints,
        travelMode: 'DRIVING',
      }
    }, [origin, destination])

  const directionsCallback = useCallback((res: SetStateAction<null> | any) => {
    if (res !== null && res.status === 'OK') {
      setResponse(res)
    } else {
      showPopInformation('Error to generate route for this packages.', 'error')
    }
  }, [])

  const directionsRendererOptions = useMemo<any>(() => {
    return {
      directions: response,
    }
  }, [response])

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
      <Grid container direction={'row'}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <LoadScript googleMapsApiKey={key}>
            <GoogleMap
              center={defaultLocation}
              zoom={15}
              mapContainerStyle={{ height: '400px', width: '800px' }}
            >
              {origin && destination && (
                <DirectionsService
                  options={directionServiceOptions}
                  callback={directionsCallback}
                />
              )}

              {response && directionsRendererOptions && (
                <DirectionsRenderer options={directionsRendererOptions} />
              )}
            </GoogleMap>
          </LoadScript>
        </Grid>
        <Grid item xs={2}></Grid>
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
                        onClick={event => openModal(true)}
                        disabled={row.finished_route !== null || row.start_route === null}
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
                      {checkStatus(row.start_route, row.finished_route) ===
                      EStatusPackage.WAREHOUSE ? (
                        <Button
                          variant="contained"
                          startIcon={<LocalShippingIcon />}
                          onClick={event => startDelivery(row.id)}
                        >
                          Start Delivery
                        </Button>
                      ) : checkStatus(row.start_route, row.finished_route) ===
                        EStatusPackage.TRANSIT ? (
                        <Button
                          variant="contained"
                          startIcon={<RouteIcon />}
                          onClick={event => generateRoute(row.id)}
                          disabled={showMap}
                        >
                          Generate Route
                        </Button>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    {row.finished_route === null ? (
                      <Modal
                        open={openValue}
                        onClose={closeModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            Packages
                          </Typography>
                          <Grid container direction={'row'}>
                            {row.packages?.map(pakage => (
                              <Grid item xs={4} sx={{ mb: 4 }}>
                                {basicCard(
                                  pakage.latitude_destination,
                                  pakage.longitude_destination,
                                  pakage.distance ?? 99999999,
                                  pakage.id,
                                  pakage.status_id !== EStatusPackage.DELIVERED,
                                  pakage.status_id,
                                )}
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      </Modal>
                    ) : null}
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
