import {createTheme} from '@mui/material/styles'
import {orange, deepOrange} from '@mui/material/colors'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: orange[500],
    },
    secondary: {
      main: deepOrange[900],
    },
  },
})
