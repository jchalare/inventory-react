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


export const UpdateCompanyPage = () => {
   const { companyId } = useParams();
   const dispatch = useDispatch();
   const { pathOneCompany,companies,getOneCompany } = useCompanyStore();

   const { name,itin,address,phone_number, onInputChange:onLoginInputChange } = useForm( companyFormFields );


 useEffect(() => {
    getOneCompany(companyId)     
  }, []); 


   const onSubmit = (event)=>{
      event.preventDefault();
      startLogin({ email: loginEmail, password: loginPassword });
   }

   
  return (
    <CompanyLayout title='Company information'>
       { companies.map((company) => (
    <form  key={company.id} onSubmit={onSubmit}>
     
                  <Grid container >
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Name'
                                   type="text"
                                   name="name"
                                   value={company.name}
                                   onChange={ onLoginInputChange }
                                   fullWidth />
                     </Grid>
                  </Grid>

                  <Grid container>
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Itin'
                                   type="text"
                                   name="itin"
                                   value={company.itin}
                                   onChange={ onLoginInputChange }
                                   fullWidth
                                   readOnly />
                     </Grid>
                  </Grid>

                  <Grid container>
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Address'
                                   type="text"
                                   name="address"
                                   value={company.address}
                                   onChange={ onLoginInputChange }                                  
                                   fullWidth />
                     </Grid>
                  </Grid>

                  <Grid container>
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Phone Number'
                                   type="text"
                                   name="phone_number"
                                   value={company.phone_number}
                                   onChange={ onLoginInputChange }                                   
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
    )) }   
      </CompanyLayout>
 
  )
}

