import { Box, Typography } from '@material-ui/core'
import React from 'react'

export default function Nodatafound() {
  return (
    <Box align="center" width="100%">
      <Box>
        <Typography color="primary" variant="body2">
          No data found
        </Typography>
        {/* <Typography>No data, please try again later</Typography> */}
      </Box>
    </Box>
  )
}
