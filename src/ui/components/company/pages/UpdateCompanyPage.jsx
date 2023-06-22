import { Grid, TextField,Button } from "@mui/material"
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';

import { CompanyLayout } from "../layout/CompanyLayout"
import { useCompanyStore, useForm } from "../../../../hooks";

export const UpdateCompanyPage = () => {

   const { companyId } = useParams();
   const dispatch = useDispatch();
   const { pathOneCompany,companies,getOneCompany,errorMessage,status} = useCompanyStore();


    const mappingCompanyData = () => {
    return companies.map((company)=>{
         if (company.id === companyId){
            return company;
         }
      });    
   }

   

   const [name,setName ] = useState(mappingCompanyData().name);
   const [itin,setItin ] = useState(mappingCompanyData().itin);
   const [address,setAddress ] = useState(mappingCompanyData().address);
   const [phone_number,setPhone ] = useState(mappingCompanyData().phone_number);

 
  const onChangeInputsValues = (event) =>{
     event.preventDefault();
     const inputChanged = event.target.name;

      switch (inputChanged) {
      case 'name':
        setName(event.target.value);
         break;
      case 'itin':
         setItin(event.target.value);
         break;
      case 'address':
          setAddress(event.target.value);
         break;
      case 'phone_number':
      setPhone(event.target.value);
         break;
      }
   }


   const onSubmit = (event)=>{
      event.preventDefault();
      pathOneCompany({companyId,name,itin,address,phone_number});
   }

 useEffect(() => {
    getOneCompany(companyId);
    if ( errorMessage !== null ) {         
        Swal.fire('Authentication error ', errorMessage, 'error');
      }
      
      if(status === 'updated'){
         Swal.fire('Company updated','','success');
      }

  }, [errorMessage,status]);  

  
  return (
    <CompanyLayout title='Company information'>
     
    <form onSubmit={onSubmit}>
     
                  <Grid container >
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Name'
                                   type="text"
                                   name="name"                                   
                                   value={name}
                                   onChange={onChangeInputsValues}                                  
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
                                   onChange={onChangeInputsValues}
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
                                   onChange={onChangeInputsValues}
                                                  
                                   fullWidth />
                     </Grid>
                  </Grid>

                  <Grid container>
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Phone Number'
                                   type="text"
                                   name="phone_number"
                                   value={phone_number}
                                   onChange={onChangeInputsValues}                                                                
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

