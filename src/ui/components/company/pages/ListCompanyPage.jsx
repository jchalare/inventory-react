import { Link,Button, Paper, Table, TableCell, TableHead, TableRow,Grid, TableBody,TableContainer, TablePagination, ListItemButton, ListItemIcon} from '@mui/material';
import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import RateReviewIcon from '@mui/icons-material/RateReview';
import {  Link as RouterLink, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


import { CompanyLayout } from "../layout/CompanyLayout"
import { useCompanyStore } from '../../../../hooks';


 
export const ListCompanyPage = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAllCompanies,companies,deleteOneCompany,status } = useCompanyStore();


  /*
  const onClickNewCompany = () => {
    //redirect('/company/create/');
    console.log('asdasd');
    

    navidate('/company/create/');
   //return <Navigate to='/company/create/'/>
  
  }*/
  
  const onDeleteCompany = (companyId) => {
     deleteOneCompany(companyId);
  }
 

   useEffect(() => {
      dispatch(getAllCompanies);

       if(status === 'deleted'){
         Swal.fire('Company was deleted','','success');
      }
  }, [status]); 
 

  return (
    <CompanyLayout title="Companies">
           <IconButton
        onClick={ () =>{ navigate('/company/create/') } }
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'primary.main',
          ':hover': { backgroundColor: 'secondary.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>View</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { companies.map((company) => (
                <TableRow key={company.id}  >
                  <TableCell  component="th" scope="row">{company.name}</TableCell>

                  <TableCell> 
                      <Link color="inherit"
                                    to={`/company/view/${company.id}`}
                                    component={RouterLink}>
                              <Button >
                                <RateReviewIcon  sx={{
                                      color: 'success.main',
                                      backgroundColor: 'white'}}/>                              
                             </Button>
                        </Link>
                     
                  </TableCell>

                  <TableCell>
                    
                    <Button onClick={()=>onDeleteCompany(company.id)}>
                             <DeleteIcon sx={{
                                              color: 'error.main',
                                              backgroundColor: 'white'}}/>                              
                        </Button>
                    
                 </TableCell>
                </TableRow>     
                  )) }                    
            </TableBody>
        </Table>
        
      </TableContainer>
      
  
      </CompanyLayout>
 
  )
}

