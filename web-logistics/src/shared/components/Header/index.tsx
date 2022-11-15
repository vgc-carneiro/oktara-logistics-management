import { AppBar, Button, Grid, Toolbar, Typography } from '@mui/material'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

const logo = (
  <Typography variant="h6" component="h1">
    Jack - Logistics Company
  </Typography>
)

const headersData = [
  {
    label: 'Packages',
    href: '/packages',
  },
  {
    label: 'Add Package',
    href: '/packages/new',
  },
  {
    label: 'Shipments',
    href: '/shipments',
  },
]

const getMenuButtons = () => {
  return headersData.map(({ label, href }) => {
    return (
      <Button
        {...{
          key: label,
          color: 'inherit',
          to: href,
          component: Link,
        }}
      >
        {label}
      </Button>
    )
  })
}

const Header: FunctionComponent = () => {
  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Grid container>
          <Grid item xs={8}>
            {logo}
          </Grid>
          <Grid item xs={4} justifyContent="flex-end">
            {getMenuButtons()}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header
