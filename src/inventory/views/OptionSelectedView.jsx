import { Grid, Typography } from '@mui/material';

import {CreateCompanyPage, ListCompanyPage} from '../../ui/components/company/pages';


export const OptionSelectedView = () => {
  return (
   <Grid container direction='row' justifyContent='space-between' sx={{mb:1}}>
   <ListCompanyPage/>
   </Grid>
  )
}

 