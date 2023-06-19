import { Grid, TextField,Button } from "@mui/material"
import { useParams } from "react-router-dom";
import { useCompanyStore, useForm } from "../../../../hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { CompanyLayout } from "../layout/CompanyLayout"


 const companyFormFields = {
    name:    '',
    itin:    '',
    address:    '',
    phone_number:    '',
}


export const CreateCompanyPage = () => {
   const { companyId } = useParams();
   const dispatch = useDispatch();
   const { pathOneCompany,companies,getOneCompany } = useCompanyStore();

   const { name,itin,address,phone_number, onInputChange:onLoginInputChange } = useForm( companyFormFields );


 useEffect(() => {
    getOneCompany(companyId)     
  }, []); 

   
  return (
    <CompanyLayout title='Create new company'>
    <form >
                  <Grid container>
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Name'
                                   type="text"
                                   name="name"
                                  value={itin}
                                   fullWidth />
                     </Grid>
                  </Grid>

                  <Grid container>
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Itin'
                                   type="text"
                                   name="itin"
                                   value={itin}
                                   fullWidth />
                     </Grid>
                  </Grid>

                  <Grid container>
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Password'
                                   type="password"
                                   name="loginPassword"                                   
                                   fullWidth />
                     </Grid>
                  </Grid>

                  <Grid container>
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Address'
                                   type="text"
                                   name="address"                                   
                                   fullWidth />
                     </Grid>
                  </Grid>

                  <Grid container>
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Phone Number'
                                   type="text"
                                   name="phone_number"                                   
                                   fullWidth />
                     </Grid>
                  </Grid>

                  <Grid container spacing={2} sx={{mb:2,mt:1}}>
                     <Grid item xs={12} >
                        <Button variant="contained"
                                fullWidth
                                type="submit"
                                > 
                                Save 
                        </Button>
                     </Grid>

                      <Grid item xs={12} >
                        <Button variant="contained"
                                fullWidth
                                type="submit"
                                > 
                                Clear 
                        </Button>
                     </Grid>
                     
                  </Grid>
                 
               </form>
   
      </CompanyLayout>
 
  )
}

