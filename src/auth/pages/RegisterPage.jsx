
import { Link as RouterLink } from "react-router-dom"
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import Swal from 'sweetalert2';


import { useEffect } from "react";

import { AuthLayout } from "../layout/AuthLayout";
import { useAuthStore, useForm } from "../../hooks";


const registerFormFields = {
    registerFullName:  '',
    registerEmail:     '',
    registerPassword:  '',
}

export const RegisterPage = () =>{

   const { errorMessage, startRegister } = useAuthStore();
   const { registerEmail, registerFullName, registerPassword,onInputChange:onRegisterInputChange } = useForm( registerFormFields );



 const registerSubmit = ( event ) => {
        event.preventDefault();
        startRegister({ fullName: registerFullName, email: registerEmail, password: registerPassword });
    }


const formatError = (errorMessage)=>{

   if(typeof errorMessage === 'string') return errorMessage;

   let htmlErrorList = '<ul>';

   errorMessage.forEach(element => {
      htmlErrorList += `<li>${element}</li>`;
   });

   htmlErrorList += '</ul>';
   
   return htmlErrorList;
}

   useEffect(() => {
      if ( errorMessage !== undefined ) {
         const formatedError = formatError(errorMessage);        
         Swal.fire({title: 'Sign up errors',html: formatedError, icon:'error' });
      }    
    }, [errorMessage]);
    

   return (
   

      <AuthLayout title="Register">

               <form onSubmit={registerSubmit}>
                <Grid container>
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Full Name'
                                   type="text"
                                   name="registerFullName"
                                   value={registerFullName}
                                   onChange={ onRegisterInputChange }
                                   fullWidth />
                     </Grid>
                  </Grid>
                  <Grid container>
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Email'
                                   type="email"
                                   name="registerEmail"
                                   value={registerEmail}
                                   onChange={ onRegisterInputChange }
                                   fullWidth />
                     </Grid>
                  </Grid>

                  <Grid container>
                     <Grid item xs={12} sx={{mt:2}}>
                        <TextField label='Password'
                                   type="password"
                                   name="registerPassword"
                                   value={registerPassword}
                                   onChange={ onRegisterInputChange }
                                   fullWidth />
                     </Grid>
                  </Grid>

                  <Grid container spacing={2} sx={{mb:2,mt:1}}>
                     <Grid item xs={12}>
                        <Button variant="contained"
                                type="submit"
                                fullWidth> Sign up </Button>
                     </Grid>
                      
                  </Grid>

                    
                     <Grid container 
                            direction="row"
                            justifyContent="end">
                              <Typography sx={{mr:1}}>
                            Already have an account?
                              </Typography>   
                              <Link color="inherit"
                                    to="/auth/login"
                                    component={RouterLink}>
                               Log in
                              </Link>

                     </Grid>
                 
               </form>
   
      </AuthLayout>
     
   
   ) 
}