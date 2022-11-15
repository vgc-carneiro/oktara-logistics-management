import styled from '@emotion/styled'
import {
  AlertColor,
  Box,
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
import { IPackage } from '../../entities/IPackage'
import GetAllPackages from '../../usecase/GetAllPackages'

interface Props {
  getAllPackages: GetAllPackages
}

const ListPackages = ({ getAllPackages }: Props) => {
  const [packagesValues, setPackages] = useState([] as IPackage[])
  const [information, setInformation] = useState('')
  const [severityInformation, setSeverity] = useState('warning' as AlertColor)

  const loadData = async () => {
    try {
      setInformation('')
      const resp = await getAllPackages.execute()

      const sorted = resp.sort((obj1, obj2) => {
        if (obj1.status_id > obj2.status_id) {
          return 1
        }

        if (obj1.status_id < obj2.status_id) {
          return -1
        }

        return 0
      })

      setPackages(sorted)
      console.log(sorted)
    } catch (e: any) {
      setInformation('No Packages were found.')
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

  return (
    <Container maxWidth="xl">
      <Grid>
        <Grid item xs={12}>
          <PopInformation information={information} severityValue={severityInformation} />
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Latitude Destination</TableCell>
                  <TableCell align="center">Longitude Destination</TableCell>
                  <TableCell align="center">Location on Warehouse</TableCell>
                  <TableCell align="center">Shipment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {packagesValues.map(row => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" align="center">
                      <StatusPackage information={row.status_id} />
                    </TableCell>
                    <TableCell align="center">{row.latitude_destination}</TableCell>
                    <TableCell align="center">{row.longitude_destination}</TableCell>
                    <TableCell align="center">{row.location?.shelf}</TableCell>
                    <TableCell align="center">{row.shipment?.id}</TableCell>
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

export default ListPackages
