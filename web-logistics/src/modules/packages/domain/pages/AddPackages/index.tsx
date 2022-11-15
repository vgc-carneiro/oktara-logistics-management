import { Button, AlertColor, Grid, InputAdornment, MenuItem, TextField } from '@mui/material'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import GetAllWarehouses from '../../../../warehouses/domain/usecases/GetAllWarehouses'
import CreatePackage from '../../usecase/CreatePackage'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined'
import { ILocation } from '../../../../warehouses/domain/entities/ILocation'
import PopInformation from '../../../../../shared/components/PopInformartion'
import AssignLocationPackage from '../../usecase/AssignLocationPackage'

interface Props {
  createPackage: CreatePackage
  listWarehouse: GetAllWarehouses
  assignLocationPackage: AssignLocationPackage
}

const AddPackages = ({ createPackage, listWarehouse, assignLocationPackage }: Props) => {
  //form
  const [latitudeValue, setLatitudeValue] = useState<string>('')
  const [longitudeValue, setLongitudeValue] = useState<string>('')
  const [locationValue, setLocation] = useState('')
  const [errorLatitude, setErrorLatitude] = useState(false)
  const [errorLongitude, setErrorLongitude] = useState(false)
  const [errorLocations, setErrorLocations] = useState(false)
  const [information, setInformation] = useState('')
  const [severityInformation, setSeverity] = useState('error' as AlertColor)

  //Locations Availables
  const [locations, setLocations] = useState<ILocation[]>([])

  const showPopInformation = (message: string, severity: AlertColor = 'error') => {
    setSeverity(severity)
    setInformation(message)
    setTimeout(() => {
      setInformation('')
    }, 5000)
  }

  const loadData = async () => {
    try {
      const resp = await listWarehouse.execute()
      const filtered = resp[0].locations.filter(obj => {
        return obj.package === null
      })

      setLocations(filtered)
    } catch (e: any) {
      console.log(e)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const onTextChangeLatitude = (e: any) => {
    setLatitudeValue(e.target.value)
  }
  const onTextChangeLongitude = (e: any) => setLongitudeValue(e.target.value)

  const handleReset = () => {
    setLongitudeValue('')
    setLatitudeValue('')
    setLocation('')
  }

  const handleLocationChange = (e: any) => {
    setLocation(e.target.value)
  }

  const handleSubmit = async () => {
    if (!latitudeValue) setErrorLatitude(true)
    if (!longitudeValue) setErrorLongitude(true)
    if (!locationValue) setErrorLocations(true)
    if (!latitudeValue || !longitudeValue || !locationValue) return

    if (!checkLatLong()) return

    try {
      const pakage = await createPackage.execute({
        latitudeDestination: +latitudeValue,
        longitudeDestination: +longitudeValue,
      })
      const pakageStored = await assignLocationPackage.execute({
        packageID: pakage.id,
        locationID: locationValue,
      })

      loadData()
      handleReset()
      showPopInformation('Package saved successfully', 'success')
    } catch (error: any) {
      showPopInformation('' + error)
    }
  }

  const checkLatLong = (): Boolean => {
    let errorMsg = ''
    if (!(+latitudeValue >= -90 && +latitudeValue <= 90))
      errorMsg += 'This is not a valid Latitude. '
    if (!(+longitudeValue >= -180 && +longitudeValue <= 180))
      errorMsg += 'This is not a valid Longitude.'
    showPopInformation(errorMsg)
    return errorMsg.length === 0
  }

  return (
    <Container maxWidth="xl">
      <Grid>
        <Grid item xs={8}>
          <TextField
            type={'number'}
            placeholder="-26.894393"
            error={errorLatitude}
            label="Latitude Destination"
            onChange={onTextChangeLatitude}
            value={latitudeValue}
            variant="standard"
            sx={{ mr: 4 }}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FormatAlignJustifyIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            type={'number'}
            placeholder="-48.674066"
            error={errorLongitude}
            label="Longitude Destination"
            onChange={onTextChangeLongitude}
            value={longitudeValue}
            variant="standard"
            required
            sx={{ mr: 4 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SwapVertOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            error={errorLocations}
            id="standard-select-currency"
            select
            label="Select"
            value={locationValue}
            onChange={handleLocationChange}
            helperText="Please select package location"
            variant="standard"
            sx={{ mr: 4 }}
          >
            {locations.map(option => (
              <MenuItem key={option.id} value={option.id}>
                {option.shelf}
              </MenuItem>
            ))}
          </TextField>

          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleReset}>Reset</Button>
        </Grid>
        <Grid item xs={4}>
          <PopInformation information={information} severityValue={severityInformation} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default AddPackages
