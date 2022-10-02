import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import {Box} from '@mui/material'

import {Chart} from '../../components/chart'
import {Deposits} from '../../components/deposits'
import {Orders} from '../../components/orders'
import {getOrdersService} from '../../services/orders-services'
import {AuthContext} from '../../contexts/auth-context'

export const DashboardPage = () => {
  const {
    user: {username},
    handleLogout,
  } = React.useContext(AuthContext)
  const [orders, setOrders] = React.useState([])
  const [isFetchingOrders, setIsFetchingOrders] = React.useState(true)

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrdersService()

        const {orders} = response.data

        setOrders(orders)
      } catch (e) {
        console.log(e)
      } finally {
        setIsFetchingOrders(false)
      }
    }
    fetchOrders()
  }, [])

  return (
    <Box component="div" sx={{display: 'flex'}}>
      <AppBar
        position="absolute"
        sx={{
          zIndex: 'drawer',
        }}
      >
        <Toolbar
          sx={{
            paddingRight: 24,
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            sx={{
              flexGrow: 1,
            }}
          >
            Dashboard
          </Typography>
          <Typography>{username}</Typography>
          <Button
            color="secondary"
            variant="contained"
            sx={{
              marginLeft: 36,
            }}
            onClick={handleLogout}
          >
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
      <main
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            minHeight: '64px',
          }}
        />
        <Container
          maxWidth="lg"
          sx={{
            paddingTop: 4,
            paddingBottom: 4,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  padding: 2,
                  display: 'flex',
                  overflow: 'auto',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <Chart />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  padding: 2,
                  display: 'flex',
                  overflow: 'auto',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <Deposits />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper
                sx={{
                  padding: 2,
                  display: 'flex',
                  overflow: 'auto',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                {isFetchingOrders && <CircularProgress />}
                {!isFetchingOrders && <Orders data={orders} />}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </Box>
  )
}
