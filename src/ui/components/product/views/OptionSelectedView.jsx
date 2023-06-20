import { Grid, Typography } from '@mui/material'

export const OptionSelectedView = () => {
  return (
   <Grid container direction='row' justifyContent='space-between' sx={{mb:1}}>
    <Typography fontSize={39} fontWeight='light'>
                Selected
    </Typography>
   </Grid>
  )
}

