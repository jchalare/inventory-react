import { Link as RouterLink } from "react-router-dom"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import Swal from 'sweetalert2';
import { useEffect } from "react";

import { AuthLayout } from "../layout/AuthLayout";
import { useAuthStore, useForm } from "../../hooks";




const loginFormFields = {
    loginEmail:    '',
    loginPassword: '',
}

 

export const LoginPage = () =>{

   const { startLogin, errorMessage } = useAuthStore();

   const { loginEmail,loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormFields );


   const onSubmit = (event)=>{
      event.preventDefault();
      startLogin({ email: loginEmail, password: loginPassword });
   }

   useEffect(() => {
      if ( errorMessage !== undefined ) {
         
        Swal.fire('Authentication error ', errorMessage, 'error');
      }    
    }, [errorMessage])
    

   return (
   <AuthLayout title="Log in">

               <form onSubmit={onSubmit}>
                  <Grid container>
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Email'
                                   type="email"
                                   name="loginEmail"
                                   value={loginEmail}
                                   onChange={ onLoginInputChange }
                                   fullWidth />
                     </Grid>
                  </Grid>

                  <Grid container>
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Password'
                                   type="password"
                                   name="loginPassword"
                                   value={loginPassword}
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
                                Login 
                        </Button>
                     </Grid>                     
                  </Grid>

                    
                     <Grid container 
                            direction="row"
                            justifyContent="end">
                              <Link color="inherit"
                                    to="/auth/register"
                                    component={RouterLink}>
                              Register
                              </Link>

                     </Grid>
                 
               </form>
   
      </AuthLayout>
     
   
   ) 
}