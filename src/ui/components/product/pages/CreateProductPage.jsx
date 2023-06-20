import { Grid, TextField,Button } from "@mui/material"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { ProductLayout } from "../layout/ProductLayout"
import { formatError } from "../../../../helpers";
import { useProductStore, useForm } from "../../../../hooks";



 const productFormFields = {
    name:    '',
    amount:    0,
    price:    0,
    description: '',
}

 
export const CreateProductPage = () => {

   const { errorMessage,status,postOneProduct } = useProductStore();

   const { name,amount,price,description, onInputChange:onProductInputChange } = useForm( productFormFields );

    const onSubmit = (event)=>{
      event.preventDefault();
      postOneProduct({name,amount,price,description });
   }
 
   useEffect(() => {
      if ( errorMessage !== null ) {         
         const formatedError = formatError(errorMessage);        
         Swal.fire({title: 'Product errors',html: formatedError, icon:'error' });
      }

      if(status === 'created'){
            Swal.fire('Product created','','success');            
      }

    }, [errorMessage,status]);
   
  return (
     <ProductLayout title='Create new product'>
     
    <form onSubmit={onSubmit}>
     
               
                  <Grid container >
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Name'
                                   type="text"
                                   name="name"                                   
                                   value={name}
                                   onChange={onProductInputChange}                                  
                                   fullWidth />
                     </Grid>
                  </Grid> 

                  <Grid container> 
                     <Grid item xs={12} sx={{mt:2}} >
                        <TextField label='Amount'
                                   type="number"
                                   name="amount"
                                   id="amount"
                                   value={amount}
                                   onChange={onProductInputChange}
                                   fullWidth
                                    />
                     </Grid>
                  </Grid>

                  <Grid container>
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Price'
                                   type="number"
                                   name="price"
                                   value={price}
                                   onChange={onProductInputChange}                                                  
                                   fullWidth />
                     </Grid>
                  </Grid>
                  

                  <Grid container> 
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Description'
                                   type="text"
                                   name="description"
                                   value={description}
                                   multiline
                                   rows={3}
                                   onChange={onProductInputChange}                                                                
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
    
      </ProductLayout>
 
  )
}

