import { Alert, AlertColor, Box, Fade } from '@mui/material'

interface Props {
  information: string
  severityValue: AlertColor
}

const PopInformation = ({ information, severityValue }: Props) => {
  return (
    <Box sx={{ height: 180, width: 1 }}>
      <Box sx={{ display: 'flex' }}>
        <Fade in={information.length > 0} timeout={500}>
          <Alert severity={severityValue}>{information}</Alert>
        </Fade>
      </Box>
    </Box>
  )
}

export default PopInformation
