import { Grid, TextField,Button } from "@mui/material"
import { useCompanyStore, useForm } from "../../../../hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { CompanyLayout } from "../layout/CompanyLayout"
import { formatError } from "../../../../helpers";


 const companyFormFields = {
    name:    '',
    itin:    '',
    address:    '',
    phone_number:    '',
}

 
export const CreateCompanyPage = () => {

   const { errorMessage,status,postOneCompany } = useCompanyStore();

   const { name,itin,address,phone_number, onInputChange:onCompanyInputChange } = useForm( companyFormFields );

    const onSubmit = (event)=>{
      event.preventDefault();
      postOneCompany({name,itin,address,phone_number });
   }
 
   useEffect(() => {
      if ( errorMessage !== null ) {         
         const formatedError = formatError(errorMessage);        
         Swal.fire({title: 'Company errors',html: formatedError, icon:'error' });
      }

      if(status === 'created'){
            Swal.fire('Company created','','success');            
      }

    }, [errorMessage,status]);
   
  return (
     <CompanyLayout title='Create new company'>
     
    <form onSubmit={onSubmit}>
     
                  <Grid container >
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Name'
                                   type="text"
                                   name="name"                                   
                                   value={name}
                                   onChange={onCompanyInputChange}                                  
                                   fullWidth />
                     </Grid>
                  </Grid> 

                  <Grid container> 
                     <Grid item xs={12} sx={{mt:2}} >
                        <TextField label='Itin'
                                   type="text"
                                   name="itin"
                                   id="itin"
                                   value={itin}
                                   onChange={onCompanyInputChange}
                                   fullWidth
                                    />
                     </Grid>
                  </Grid>

                  <Grid container>
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Address'
                                   type="text"
                                   name="address"
                                   value={address}
                                   onChange={onCompanyInputChange}
                                                  
                                   fullWidth />
                     </Grid>
                  </Grid>

                  <Grid container>
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Phone Number'
                                   type="text"
                                   name="phone_number"
                                   value={phone_number}
                                   onChange={onCompanyInputChange}                                                                
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
                  </Grid>
                     
               </form>
    
      </CompanyLayout>
 
  )
}

