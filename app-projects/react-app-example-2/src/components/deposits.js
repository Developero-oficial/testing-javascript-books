import React from 'react'
import Typography from '@mui/material/Typography'

const today = new Date()

export const Deposits = () => {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Deposits
      </Typography>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="textSecondary" sx={{flex: 1}}>
        on {today.toLocaleDateString()}
      </Typography>
      <div>
        <Typography>Updated</Typography>
      </div>
    </React.Fragment>
  )
}
